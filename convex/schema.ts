import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // To define the schema of the table that needs to be used via convex(if not defined it will be used as no-sql)

  memberships: defineTable({
    orgId: v.string(),
    userId: v.string(),
  }).index("by_orgId_userId", ["orgId", "userId"]),

  documents: defineTable({ 
    title: v.string(),
    description: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    orgId:v.optional(v.string()),
    embedding: v.optional(v.array(v.float64())),
    fileId: v.id("_storage")}) //"_storage" defines the ID of Storage.
    .index('by_tokenIdentifier',['tokenIdentifier'])
    //The above table will indexed by the token-identifier from the logged in user.
    .index('by_orgId',['orgId']),

  chats: defineTable({
      documentId: v.id("documents"),
      tokenIdentifier: v.string(),
      isHuman: v.boolean(),
      text: v.string(),
    }).index("by_documentId_tokenIdentifier", ["documentId", "tokenIdentifier"]),
    //The above table will indexed by the token-identifier from the logged in user and also the document IDs.

    //schema with vector search enabled
    notes: defineTable({ 
      text: v.string(),
      orgId: v.optional(v.string()),
      embedding: v.optional(v.array(v.float64())),
      tokenIdentifier: v.optional(v.string()),})
      .index('by_tokenIdentifier',['tokenIdentifier']).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
        filterFields: ["tokenIdentifier"],
      })
      .index("by_orgId", ["orgId"])
      // .vectorIndex("by_embedding", {
      //   vectorField: "embedding",
      //   dimensions: 1536,
      //   filterFields: ["tokenIdentifier", "orgId"],
      // }),
});