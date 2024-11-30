"use client";
//The above marker that tells Next.js: "Everything below this line needs to run in the browser, not just on the server."
//Next.js 13+ uses React Server Components by default. Server Components cannot use hooks or browser-specific APIs


import {useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentCard from "./dashboard/documents/document-card";
import UploadDocumentButton from "./dashboard/documents/upload-document-button";
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";
import Image from "next/image";


export default function Home() {
  const documents =useQuery(api.document.getDocuments);
  return (
    <main className="w-full space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <UploadDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-3 gap-8">
       {/* This line is creating 8 loading skeleton UI where _ is the unused value (empty string in this case) and i is the index of the current iteration  */}
          {new Array(8).fill("").map((_, i) => (
            <Card className="h-[200px] p-6 flex flex-col justify-between" key={i}>
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/documents.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-2xl">You don't have any documents</h2>
          <UploadDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents?.map((doc) => <DocumentCard document={doc} />)}
        </div>
      )}
    </main>
  );
}