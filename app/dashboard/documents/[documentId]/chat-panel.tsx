"use client";
//Here we have kept the file in a folder\[parameter_value]-> which will load the page.tsx component when triggered.
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chat.getChatsForDocument, { documentId });

  return (
    <div className="dark:bg-gray-900 bg-slate-100 flex flex-col gap-2 p-6 rounded-xl">
      <div className="h-[350px] overflow-y-auto space-y-3">
        <div className="dark:bg-slate-950 rounded p-3">
          🤖: Ask any question using AI about this document below:
        </div>
        {chats?.map((chat) => (
            //The cn() provides a conditional css
          <div key={chat._id}
            className={cn(
              {
                "dark:bg-slate-800 bg-slate-200": chat.isHuman,
                "dark:bg-slate-950 bg-slate-300": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "rounded p-4 whitespace-pre-line"
            )}
          >
            {chat.isHuman ? "🧑🏽‍💻" : "🤖"}: {chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
}