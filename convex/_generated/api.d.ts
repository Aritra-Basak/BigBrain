/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as chat from "../chat.js";
import type * as clerk from "../clerk.js";
import type * as document from "../document.js";
import type * as http from "../http.js";
import type * as memberships from "../memberships.js";
import type * as notes from "../notes.js";
import type * as search from "../search.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  chat: typeof chat;
  clerk: typeof clerk;
  document: typeof document;
  http: typeof http;
  memberships: typeof memberships;
  notes: typeof notes;
  search: typeof search;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
