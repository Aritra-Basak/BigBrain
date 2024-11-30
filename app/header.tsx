"use client";

import React from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Image from "next/image";
import HeaderActions from './header-actions';
import Link from 'next/link';

export default function header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
       <div className="container mx-auto flex justify-between items-center">
       <div className="flex gap-8 items-center">
       <Link href="/" className="flex items-center gap-4 text-2xl">
       <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded"
              alt="an image of a brain"
            />
            <p>2<sup>nd</sup>  Brain 🧠</p>
            </Link>
        </div>
        <div className="flex gap-4 items-center">
        <ModeToggle />
        <HeaderActions />
      </div>
      </div>
    </div>
  )
}
