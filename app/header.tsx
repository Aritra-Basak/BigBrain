"use client";

import React from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Image from "next/image";
import HeaderActions from './header-actions';
import Link from 'next/link';
import { Authenticated } from 'convex/react';

export default function header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
       <div className="container mx-auto flex justify-between items-center">
       <div className="flex gap-8 items-center">
       <Link href="/" className="flex items-center gap-4 text-2xl">
       <p>Big Brain</p>
       <Image
              src="/brainDesign.svg"
              width={40}
              height={40}
              className="rounded"
              alt="Brain"
            />
            
            </Link>

            <nav className="flex items-center gap-8">
          

            <Authenticated>
              <Link href="/dashboard" className="hover:text-slate-300">
                Dashboard
              </Link>
            </Authenticated>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
        <ModeToggle />
        <HeaderActions />
      </div>
      </div>
    </div>
  )
}
