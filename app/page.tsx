"use client";
//The above marker that tells Next.js: "Everything below this line needs to run in the browser, not just on the server."
//Next.js 13+ uses React Server Components by default. Server Components cannot use hooks or browser-specific APIs


import {useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentCard from "./document-card";
import CreateDocumentButton from "./create-document-button";


export default function Home() {
  const documents =useQuery(api.document.getDocuments);
  return (
    
      <main className="p-24 space-y-8">
        <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
        </div>
        <div className="grid grid-cols-4 gap-8 ">
        {
          documents?.map((doc)=>(
            <DocumentCard key={doc._id} document={doc} />
          ))
        }
        </div>
    </main> 
 
  );
}