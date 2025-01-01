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
      {/* Toggle Button with Glow Effect */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute left-1 top-0 p-2",
          "bg-cyan-500 text-white rounded-b-md",
          "transition-all duration-500 ease-in-out",
          "hover:bg-cyan-400 hover:shadow-lg",
          "relative overflow-hidden",
          "before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-cyan-300/0 before:via-cyan-300/50 before:to-cyan-300/0",
          "before:animate-glow before:transition-opacity",
          "after:absolute after:inset-0",
          "after:bg-gradient-to-r after:from-white/0 after:via-white/25 after:to-white/0",
          "after:animate-glow after:transition-opacity",
          isOpen ? "before:opacity-100 after:opacity-100" : "before:opacity-0 after:opacity-0",
          "flex items-center gap-2 transform"
        )}
      >
        <ChevronDown 
          className={cn(
            "transition-transform duration-300 relative z-10",
            isOpen ? "rotate-180" : "rotate-0"
          )} 
        />
      </button>

      {/* Navigation Menu */}
      <div
        className={cn(
          "absolute left-4 top-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-lg rounded-md transition-all duration-300 ease-in-out",
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
                  "font-light flex gap-2 items-center text-xl transition-colors duration-200",
                  "hover:text-cyan-400 dark:hover:text-cyan-100",
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
                  "font-light flex gap-2 items-center text-xl transition-colors duration-200",
                  "hover:text-cyan-400 dark:hover:text-cyan-100",
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
                  "font-light flex gap-2 items-center text-xl transition-colors duration-200",
                  "hover:text-cyan-400 dark:hover:text-cyan-100",
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