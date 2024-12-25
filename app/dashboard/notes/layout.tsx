"use client";

import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="w-full min-h-screen p-3 md:p-6 lg:p-8 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Image 
            src="/notes.svg" 
            width="50" 
            height="50" 
            alt="Doc Icon" 
            className="w-12 h-12 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px]"
          />
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">My Notes</h1>
        </div>
        <CreateNoteButton />
      </div>

      {/* Responsive Container with Fixed Ratio */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Notes List Section - 30% width */}
        <div className="w-full md:w-[30%] h-[200px] md:h-[calc(100vh-250px)] overflow-auto">
          {!notes ? (
            <div className="w-full space-y-2 p-4 bg-slate-100 dark:bg-slate-900 rounded">
              <Skeleton className="h-5 w-full" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded">
              <h2 className="text-base md:text-lg lg:text-xl">You have no notes</h2>
            </div>
          ) : (
            <div className="h-full p-4 bg-slate-100 dark:bg-slate-900 rounded">
              <ul className="space-y-2">
                {notes.map((note) => (
                  <li
                    key={note._id}
                    className={cn(
                      "flex items-center text-sm md:text-base lg:text-lg hover:text-cyan-300 transition-colors cursor-pointer",
                      { "text-cyan-300 font-bold": note._id === noteId }
                    )}
                  >
                    <span className="mr-2 flex-shrink-0">•</span>
                    <Link href={`/dashboard/notes/${note._id}`} className="truncate block w-full">
                      {note.text.substring(0, 24) + "..."}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Note Content Section - 55% width */}
        <div className="w-full md:w-[50vw] min-h-[300px] md:h-[calc(100vh-250px)] dark:bg-gray-900 bg-slate-100 rounded p-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-gray-800 transition-colors">
          {children ? (
            <div className="h-full overflow-auto">
              <div className="max-w-full break-words whitespace-pre-wrap">
                {children}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm md:text-base">
              Select a note to view its details.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}