import { v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { useQuery } from "convex/react";


export const searchAction = action({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if(!userId){
        return null;
    }
    var noteResults=null;
    try {
      // 1. Generate an embedding from you favorite third party API:
      var embedding = await embed(args.search);
    
    // 2. Then search for similar foods!
    noteResults = await ctx.vectorSearch("notes", "by_embedding", {
      vector: embedding ,
      // vector: embedding as number[], -- for using Groq client
      limit: 5,
      filter: (q) => q.eq("tokenIdentifier", userId),
    });

    } catch (error) {
        noteResults = useQuery(api.notes.getNotes);
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