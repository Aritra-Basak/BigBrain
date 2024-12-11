"use client";

import React, { useState } from 'react'
import Image from "next/image";
import { SearchForm } from './search-form';
import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';


export default function SearchPage() {
  const [results , setResults] =useState<typeof api.search.searchAction._returnType> (null);
  return (
    <main className='w-full space-y-8  p-6'>
         <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Image
                            src="/search.svg"
                            width="70"
                            height="70"
                            alt="Doc Icon"
                    />
                <h1 className="text-4xl font-bold">Search</h1>
            </div>    
        </div>
        <SearchForm setResults={setResults}/>
        <ul className='space-y-4'>
           {
            results?.map((result)=>{
              if(result.type==="notes"){
                return(
                  <Link href={`/dashboard/notes/${result.record._id}`}>
                    <li className='bg-slate-800 rounded p-4 whitespace-pre-line'>
                      type: Note
                      {result.record.text.substring(0,500)+"...."}
                    </li>
                  </Link>
                )
              } else{
                return(
                  <Link href={`/dashboard/documents/${result.record._id}`}>
                    <li className='bg-slate-800 rounded p-4 whitespace-pre-line'>
                    type: Note
                    {result.record.title.substring(0,500)+"...."}
                    </li>
                  </Link>
                )
              }
            })
           }
        </ul>
        
    </main>
  )
}
