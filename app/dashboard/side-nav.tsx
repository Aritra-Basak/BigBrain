"use client";

import { cn } from "@/lib/utils";
import { ClipboardPen, FilesIcon, Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-16 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-1 top-0 p-2 bg-cyan-500 bg-opacity-30 hover:bg-cyan-600 text-white rounded-b-md transition-all duration-300 transform flex items-center gap-2"
      >
        {/* The cn() provides Condition CSS */}
        <ChevronDown 
          className={cn(
            "transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )} 
        />
      </button>

      {/* Navigation Menu */}
      <div
        className={cn(
          "absolute left-4 top-12 bg-white dark:bg-slate-900 shadow-lg rounded-md transition-all duration-300 ease-in-out",
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-2 pointer-events-none",
          "border border-slate-200 dark:border-slate-700"
        )}
      >
        <nav className="p-4 w-48">
          <ul className="space-y-6">
            <li>
              <Link
                className={cn(
                  "font-light flex gap-2 items-center text-xl hover:text-cyan-400 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": pathname.endsWith("/search"),
                  }
                )}
                href="/dashboard/search"
                onClick={() => setIsOpen(false)}
              >
                <Search />
                Search
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  "font-light flex gap-2 items-center text-xl hover:text-cyan-400 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": pathname.endsWith("/documents"),
                  }
                )}
                href="/dashboard/documents"
                onClick={() => setIsOpen(false)}
              >
                <FilesIcon />
                Documents
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  "font-light flex gap-2 items-center text-xl hover:text-cyan-400 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": pathname.endsWith("/notes"),
                  }
                )}
                href="/dashboard/notes"
                onClick={() => setIsOpen(false)}
              >
                <ClipboardPen />
                Notes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}