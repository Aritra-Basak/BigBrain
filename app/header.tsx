"use client";

import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import HeaderActions from "./header-actions";
import Link from "next/link";
import { Authenticated } from "convex/react";
import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 text-xl sm:text-2xl">
            <p>Big Brain</p>
            <Image
              src="/brainDesign.svg"
              width={40}
              height={40}
              className="rounded"
              alt="Brain"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4 sm:gap-8">
            <OrganizationSwitcher />
            <Authenticated>
              <Link
                href="/dashboard"
                className="text-sm sm:text-base hover:text-slate-300"
              >
                Dashboard
              </Link>
            </Authenticated>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-0">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
