"use Client";

import React from 'react'
import Image from "next/image";


export default function NotesPage() {
  return (
    <main className='w-full space-y-8  p-6'>
         <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <Image
                        src="/notes.svg"
                        width="70"
                        height="70"
                        alt="Doc Icon"
                />
            <h1 className="text-4xl font-bold">My Notes</h1>
        </div>    
      </div>
    </main>
  )
}
