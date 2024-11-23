
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

//This is a mutation function which will be called from the frontend to send data at backend(convex)
//At backend it will be used to perform data base operation at convex data-base.
export const createDocument = mutation({
    args:{
        title:v.string()
    },
    async handler(ctx, args) {
        const userId =(await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            throw new ConvexError('Not Authenticated.');
        }
        await ctx.db.insert('documents',{
            title:args.title,
            tokenIdentifier:userId
        })
    },
})

// Function to be used to fetch data from the table
export const getDocuments = query({
    async handler(ctx) {
        const userId =(await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId){
            return [];
        }
        return await ctx.db.query('documents').withIndex('by_tokenIdentifier',(q)=>q.eq('tokenIdentifier',userId)).collect();
        
    }
})