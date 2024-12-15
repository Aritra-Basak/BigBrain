"use client";

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { SearchForm } from './search-form';
import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import local from 'next/font/local';
import { FileIcon, NotebookPen } from 'lucide-react';


function SearchResult({
  url,
  typeOfNote,
  text,
}:{
  url:string;
  typeOfNote:string;
  text:string;
}){
  return (
    <Link href={url}>
      <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
        <div className="flex justify-between gap-2 text-xl items-center">
          <div className="flex gap-2 items-center">
            {typeOfNote === "note" ? (
              <NotebookPen className="w-5 h-5" />
            ) : (
              <FileIcon className="w-5 h-5" />
            )}
            {typeOfNote === "note" ? "Note" : "Document"}
          </div>
        </div>
        <div>{text.substring(0, 500) + "..."}</div>
      </li>
    </Link>
  );
}

export default function SearchPage() {
  const [results , setResults] =useState<typeof api.search.searchAction._returnType> (null);
  useEffect(()=>{
    const storedResults=localStorage.getItem("searchResults");
    if(!storedResults) return;
    setResults(JSON.parse(storedResults));
  },[])
  
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
        {/* Stores the search results in the localStorage using a key - "searchResults" */}
        <SearchForm setResults={(searchResults)=>{
          setResults(searchResults)
          localStorage.setItem("searchResults",JSON.stringify(searchResults))
        }}/>
        <ul className='flex flex-col gap-4'>
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <SearchResult
                typeOfNote="note"
                url={`/dashboard/notes/${result.record._id}`}
                text={result.record.text}
              />
            );
          } else {
            return (
              <SearchResult
                typeOfNote="document"
                url={`/dashboard/documents/${result.record._id}`}
                text={result.record.title + ": " + result.record.description}
              />
            );
          }
        })}
        </ul>
        
    </main>
  )
}
