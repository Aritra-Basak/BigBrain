"use client";
//The above marker that tells Next.js: "Everything below this line needs to run in the browser, not just on the server."
//Next.js 13+ uses React Server Components by default. Server Components cannot use hooks or browser-specific APIs

import {useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentCard from "./document-card";
import UploadDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";

export default function Home() {
  const organization = useOrganization();

  const documents = useQuery(api.document.getDocuments, {
    orgId: organization.organization?.id,
  });

  return (
    <main className="w-full space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Image
            src="/document2.svg"
            width="50"
            height="50"
            alt="Doc Icon"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">My Documents</h1>
        </div>    
        <UploadDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card 
              className="h-[180px] sm:h-[200px] p-4 sm:p-6 flex flex-col justify-between" 
              key={i}
            >
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="py-8 sm:py-12 flex flex-col justify-center items-center gap-6 sm:gap-8">
          <Image
            src="/documents.svg"
            width="150"
            height="150"
            alt="a picture of a girl holding documents"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px]"
          />
          <h2 className="text-xl sm:text-2xl text-center">You don&apos;t have any documents</h2>
          <UploadDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {documents?.map((doc) => <DocumentCard document={doc} key={doc._id}/>)}
        </div>
      )}
    </main>
  );
}