
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

//This is a mutation function which will be called from the frontend to send data at backend(convex)
//At backend it will be used to perform data base operation at convex data-base.
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
        await ctx.db.insert('documents',{
            title:args.title,
            tokenIdentifier:userId,
            fileId:args.fileId,
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
        const userId =(await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            return null;
        }
        const document =await ctx.db.get(args.documentId);
        if(!document){return null;}
        if (document.tokenIdentifier!==userId){return null;}
        return {...document,documentUrl:await ctx.storage.getUrl(document.fileId)};
        
    }
})
//This function is used to generate a secure, pre-signed(meaning it's secure and time-limited) URL for file uploads in a Convex backend. 
//The mutation indicates it's a Convex mutation, meaning it can modify the backend state.
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  });

//   export const deleteDocument = mutation({
//     args: {
//       documentId: v.id("documents"),
//     },
//     async handler(ctx, args) {
//       const accessObj = await hasAccessToDocument(ctx, args.documentId);
  
//       if (!accessObj) {
//         throw new ConvexError("You do not have access to this document");
//       }
  
//       await ctx.storage.delete(accessObj.document.fileId);
//       await ctx.db.delete(args.documentId);
//     },
//   });