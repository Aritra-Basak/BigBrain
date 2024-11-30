"use client";

//The file structure documents\[documentId] signify the parameter passed as documentId
import {useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";


export default function DocumentPage({params}:{
    params:{documentId:Id<"documents">;}
}) {
  const document =useQuery(api.document.getDocument,{
    documentId:params.documentId,
  });

  if(!document){
    return <div>"You don't have access to view this document."</div>
  }
  return (
      <main className="p-24 space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{document.title}</h1>
            <div className="flex gap-12">
              <div className="bg-gray-900 p-4 rounded flex-1 h-[600px]">
                {document.documentUrl && (
                  <iframe className="w-full" src={document.documentUrl}/>
                )}
              </div>
              <div className="w-[300px] bg-gray-900"></div>
            </div>
        </div>
    </main> 
 
  );
}