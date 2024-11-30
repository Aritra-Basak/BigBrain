//This is a Convex Backend file.
//Here we define our server-side functions and database operations. 
import { action, internalAction, internalMutation, internalQuery, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import {api, internal} from "./_generated/api"
import Groq from 'groq-sdk';
import { Id } from "./_generated/dataModel";

// Groq API KEY
const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  // A utility function to check whete the logged in user has access to the document or not.
export async function hasAccessToDocument( 
    ctx:MutationCtx | QueryCtx,
    documentId: Id<"documents">
){
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if(!userId){
        return null;
    }

    const document = await ctx.db.get(documentId);
    if(!document){
        return null;
    }
    if(document.tokenIdentifier !==userId){
        return null;
    }
    return {document,userId};
}
  
// Function to be called from the action type function as they don't have the access of db directly
export const hasAccessToDocumentQuery =internalQuery({
    args:{
        documentId:v.id("documents"),
    },
    async handler(ctx,args){
        return await hasAccessToDocument(ctx, args.documentId);
    }
})


//This is a mutation function which will be called from the frontend to send data at backend(convex)
//At backend it will be used to perform write operation at convex data-base.
export const createDocument = mutation({
    args:{
        title:v.string(),
        fileId:v.id("_storage")
    },
    async handler(ctx, args) {
        const userId =(await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            throw new ConvexError('Not Authenticated.');
        }
        const docId=await ctx.db.insert('documents',{
            title:args.title,
            tokenIdentifier:userId,
            fileId:args.fileId,
            description: ""
        });

        //an inqueue event that going to trigger as soon as createDocument function is triggered.
        await ctx.scheduler.runAfter(0,internal.document.generateDocumentDescription,{
            fileId:args.fileId,
            documentId:docId
        })
    },
})

// Function to be used to fetch data from the table
export const getDocuments = query({
    //Ensures the input is a valid Convex ID. Specifically validates that it's an ID from the 'documents' table
    async handler(ctx) {
        //Fetch the userId of the logged in user.
        const userId =(await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            return [];
        }
        return await ctx.db.query('documents').withIndex('by_tokenIdentifier',(q)=>q.eq('tokenIdentifier',userId)).collect();
    }
})

//Function to fetch a single document w.r.t the document ID.
export const getDocument = query({
    //Ensures the input is a valid Convex ID. Specifically validates that it's an ID from the 'documents' table
    args:{
        documentId:v.id('documents')
    },
    async handler(ctx,args) {
        const accessObj = await hasAccessToDocument(ctx,args.documentId);
        if(!accessObj){return null;}
        return {...accessObj.document,documentUrl:await ctx.storage.getUrl(accessObj.document.fileId)};
        
    }
})

//Function to generate a secure, pre-signed(meaning it's secure and time-limited) URL for file uploads in a Convex backend. 
//The mutation indicates it's a Convex mutation, meaning it can modify the backend state.
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  });

//Functions that can call external APIs
//Function to pass the document and prompt to Groq
export const askQuestion =action({
    args:{
        question:v.string(),
        documentId:v.id('documents')
    },
    async handler(ctx, args) {
        const accessObj =await ctx.runQuery(internal.document.hasAccessToDocumentQuery, {
            documentId:args.documentId
        })
        if(!accessObj){
            throw new ConvexError("Oops! You don't have the access to this document.");
        }
        const file =await ctx.storage.get(accessObj.document.fileId);
        if(!file){
            throw new ConvexError("File not found.");
        }
        const text = await file.text();
       // console.log(text);
        const chatCompletion: Groq.Chat.ChatCompletion = await client.chat.completions.create({
            messages: [
                { 
                 role: 'system',
                 content: `Here is a text file: ${text}` 
                },
                {
                    role: 'user',
                    content: `Please answer this question ${args.question} related to the text file.`
                }
            ],
            model: 'llama3-8b-8192',
          });
          // To store the user prompts as a record
            await ctx.runMutation(internal.chat.createChatRecord, {
                documentId:args.documentId,
                text: args.question,
                isHuman :true,
                tokenIdentifier: accessObj.userId
            });
          // To store the AI responses as a record
          const response =
          chatCompletion.choices[0].message.content ??
          "Could not generate a response";
    
            await ctx.runMutation(internal.chat.createChatRecord, {
            documentId: args.documentId,
            text: response,
            isHuman: false,
            tokenIdentifier: accessObj.userId,
            });
          return response;
    },
})

//Function to get a description for the uploaded documents
export const generateDocumentDescription =internalAction({
    args:{
        fileId:v.id("_storage"),
        documentId:v.id('documents')
    },
    async handler(ctx, args) {
        const file = await ctx.storage.get(args.fileId);
        if(!file){
            throw new ConvexError("File not found.");
        }
        const text = await file.text();
       // console.log(text);
        const chatCompletion: Groq.Chat.ChatCompletion = await client.chat.completions.create({
            messages: [
                { 
                 role: 'system',
                 content: `Here is a text file: ${text}` 
                },
                {
                    role: 'user',
                    content: `Please generate one sentence description for this document.`
                }
            ],
            model: 'llama3-8b-8192',
          });
          
          const response =
          chatCompletion.choices[0].message.content ??
          "Could not figure out the description for this document.";
    
            await ctx.runMutation(internal.document.updateDocumentDescription, {
            documentId: args.documentId,
            description:response
            });
    },
})

//Function to generate a document description via AI
export const updateDocumentDescription = internalMutation({
    args:{
        documentId: v.id("documents"),
        description: v.string(),
    },
    async handler(ctx, args){
        await ctx.db.patch(args.documentId,{
            description:args.description,
        });
    },
});

//Function to delete a particular document
export const deleteDocument = mutation({
args: {
    documentId: v.id("documents"),
},
async handler(ctx, args) {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
    throw new ConvexError("You do not have access to this document");
    }

    await ctx.storage.delete(accessObj.document.fileId);
    await ctx.db.delete(args.documentId);
},
});