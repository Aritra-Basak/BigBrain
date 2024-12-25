"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDocumentButton } from "./delete-document-button";
import Image from "next/image";
import { use } from 'react';

export default function DocumentPage({
  params,
}: {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}) {
  // Unwrap the params using React.use()
  const resolvedParams = use(params);
  const document = useQuery(api.document.getDocument, {
    documentId: resolvedParams.documentId,
  });
  const isLoading = !document;

  return (
    <main className="space-y-4 sm:space-y-6 md:space-y-8 w-full p-4 sm:p-6">
      {isLoading && (
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <div>
            <Skeleton className="h-[30px] sm:h-[35px] md:h-[40px] w-full sm:w-[400px] md:w-[500px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-[30px] sm:h-[35px] md:h-[40px] w-[60px] sm:w-[70px] md:w-[80px]" />
            <Skeleton className="h-[30px] sm:h-[35px] md:h-[40px] w-[60px] sm:w-[70px] md:w-[80px]" />
          </div>
          <Skeleton className="h-[300px] sm:h-[400px] md:h-[500px]" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Image
                src="/chatPanel.svg"
                width="70"
                height="70"
                alt="chat window"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px]"
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">
                {document.title}
              </h1>
            </div>
            <DeleteDocumentButton documentId={document._id} />
          </div>

          <div className="flex gap-4 sm:gap-8 md:gap-12">
            <Tabs defaultValue="document" className="w-full">
              <TabsList className="mb-2 w-full sm:w-auto">
                <TabsTrigger 
                  value="document" 
                  className="text-sm sm:text-base"
                >
                  📃 Document
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="text-sm sm:text-base"
                >
                  💬 Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="document">
                <div className="dark:bg-gray-900 bg-slate-100 p-2 sm:p-4 rounded-xl flex-1 h-[300px] sm:h-[400px] md:h-[500px]">
                  {document.documentUrl && (
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={document.documentUrl}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <ChatPanel documentId={document._id} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </main>
  );
}