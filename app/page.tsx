"use client";
//The above marker that tells Next.js: "Everything below this line needs to run in the browser, not just on the server."
//Next.js 13+ uses React Server Components by default. Server Components cannot use hooks or browser-specific APIs

import { SignInButton } from "@clerk/nextjs";
import { Unauthenticated, useQuery } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import { Authenticated } from "convex/react";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </main> 
    </div>
  );
}