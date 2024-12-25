import { v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { useQuery } from "convex/react";


export const searchAction = action({
  args: {
    search: v.string(),
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if(!userId){
        return null;
    }
    if (args.orgId) {
      const hasAccess = await ctx.runQuery(
        internal.memberships.hasOrgAccessQuery,
        {
          orgId: args.orgId,
        }
      );

      if (!hasAccess) {
        return null;
      }
    }
    const filter = args.orgId
      ? (q: any) => q.eq("orgId", args.orgId)
      : (q: any) => q.eq("tokenIdentifier", userId);

    var noteResults=null;
    try {
      // 1. Generate an embedding from you favorite third party API:
      var embedding = await embed(args.search);
    // 2. Then search for similar foods!
    noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding ,
      // vector: embedding as number[], -- for using Groq client
      limit: 5,
      filter: filter
    });

    } catch (error) {
      if(args.orgId){
        noteResults = useQuery(api.notes.getNotes,{orgId:args.orgId});
      }else{
        noteResults = useQuery(api.notes.getNotes,{});
      } 
    } finally{
      if(noteResults===null){

      }
    }

    const records: (
      | { type: "notes"; record: Doc<"notes"> }
      | { type: "documents"; record: Doc<"documents"> }
    )[] = [];

    if (noteResults) {
      await Promise.all(
        noteResults.map(async (result) => {
          const note = await ctx.runQuery(api.notes.getNote, {
            noteId: result._id,
          });
          if (!note) {
           return null;
          }
          records.push({
            record: note,
            type: "notes",
          });
        })
      );
    }

    return records;
  }
});