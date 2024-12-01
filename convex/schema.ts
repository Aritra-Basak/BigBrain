import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // To define the schema of the table that needs to be used via convex(if not defined it will be used as no-sql)

  documents: defineTable({ 
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.string(),
    fileId: v.id("_storage")}) //"_storage" defines the ID of Storage.
    .index('by_tokenIdentifier',['tokenIdentifier']),
    //The above table will indexed by the token-identifier from the logged in user.

  chats: defineTable({
      documentId: v.id("documents"),
      tokenIdentifier: v.string(),
      isHuman: v.boolean(),
      text: v.string(),
    }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
    //The above table will indexed by the token-identifier from the logged in user and also the document IDs.

    notes: defineTable({ 
      text: v.string(),
      tokenIdentifier: v.string()})
      .index('by_tokenIdentifier',['tokenIdentifier']),


});