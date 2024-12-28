import { v } from "convex/values";
import { action } from "./_generated/server";
import { embed } from "./notes";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const searchAction = action({
  args: {
    search: v.string(),
    orgId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
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

    let noteResults = null;
    let documentResults = null;

    // Try vector search first
    try {
      const embedding = await embed(args.search);
      noteResults = await ctx.vectorSearch("notes", "by_embedding", {
        vector: embedding,
        limit: 5,
        filter: filter
      });

      documentResults = await ctx.vectorSearch(
        "documents",
        "by_embedding",
        {
          vector: embedding,
          limit: 5,
          filter,
        }
      );

      // Defining the data type of the records.
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

      // To get the documents via Vector Search
      // if(documentResults){
      //   await Promise.all(
      //     documentResults.map(async (result) => {
      //       const document = await ctx.runQuery(api.document.getDocument, {
      //         documentId: result._id,
      //       });
      //       if (!document) {
      //         return;
      //       }
      //       records.push({
      //         record: document,
      //         type: "documents",
      //       });
      //     })
      //   );
      // }

      return records;

    } catch (error) {
      console.error("Vector search failed, falling back to regular query:", error);
      
      // Fallback to regular getNotes query
      const allNotes = args.orgId 
        ? await ctx.runQuery(api.notes.getNotes, { orgId: args.orgId }) 
        : await ctx.runQuery(api.notes.getNotes,{});
      //console.log(allNotes);
      
      //To get all the Documents associated with the current User and it's respective Org.
      // const allDoc=args.orgId
      //   ? await ctx.runQuery(api.document.getDocuments, { orgId: args.orgId }) 
      //   : await ctx.runQuery(api.document.getDocuments,{});

      // If getNotes returns null (e.g., due to permissions), return empty array
      if (!allNotes) {
        return [];
      }

      // Process regular query results
      const records: (
        | { type: "notes"; record: Doc<"notes"> }
        | { type: "documents"; record: Doc<"documents"> }
      )[] = [];

      // Since getNotes already returns Doc<"notes">[], we can safely add them
      allNotes.forEach((note: Doc<"notes">) => {
        records.push({
          type: "notes",
          record: note
        });
      });

      return records;
    }
  },
});