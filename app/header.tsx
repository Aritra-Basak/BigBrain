"use client";

import React, { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import HeaderActions from "./header-actions";
import Link from "next/link";
import { Authenticated } from "convex/react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Frosted glass effect container - reduced opacity */}
      <div className="relative backdrop-blur-md bg-white/30 dark:bg-slate-900/30 shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between h-14">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-6">
              {/* Logo - Simplified */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  width="40"
                  height="40"
                  alt="Doc Icon"
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-lg font-semibold text-red-500">Big Brain</span>
              </Link>

              {/* Navigation - Reduced size */}
              <nav className="flex items-center gap-6">
                <Authenticated>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium transition-colors hover:text-red-500 dark:hover:text-red-400"
                  >
                    Dashboard
                  </Link>
                </Authenticated>
              </nav>
            </div>

            {/* Actions - Compact */}
            <div className="flex items-center gap-3">
              <ModeToggle />
              <HeaderActions />
              <OrganizationSwitcher />
            </div>
          </div>

          {/* Mobile Layout */}
          {/* Hidden till the width of 768px */}
          <div className="md:hidden">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 text-xl">
                <p className="text-red-500 font-bold">Big Brain</p>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu - Added overflow-y-auto and contained within header */}
            <div
              className={`${
                isMenuOpen ? "max-h-96" : "max-h-0"
              } overflow-y-auto transition-all duration-300 ease-in-out relative bg-inherit`}
            >
              <div className="space-y-4 pb-4">
                <nav className="flex flex-col gap-4">
                  <Authenticated>
                    <Link
                      href="/dashboard"
                      className="text-base px-2 py-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Authenticated>
                </nav>
                <div className="flex flex-col gap-4 px-2">
                  <div className="flex items-center gap-4">
                    <ModeToggle />
                    <HeaderActions />
                  </div>
                  <OrganizationSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}