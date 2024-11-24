"use client";

import { UserButton } from '@clerk/nextjs'
import { Authenticated } from 'convex/react'
import { SignInButton } from '@clerk/nextjs'
import { Unauthenticated } from 'convex/react'
import React from 'react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Image from "next/image";

export default function header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
       <div className="container mx-auto flex justify-between items-center">
       <div className="flex gap-8 items-center">
       <Image
              src="/logo.png"
              width={40}
              height={40}
              className="rounded"
              alt="an image of a brain"
            />
            Big Brain
        </div>
      <div>
        <Unauthenticated>
            <SignInButton />
        </Unauthenticated>
         <Authenticated>
            <div className='flex gap-4'>
                <ModeToggle />
                <UserButton />
            </div>  
        </Authenticated>
      </div>
      </div>
    </div>
  )
}
