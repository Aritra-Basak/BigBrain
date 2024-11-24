"use client";

import {useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UploadDocumentForm from "./upload-document-form";
import { useState } from "react";
  


export default function CreateDocumentButton() {
    const [isOpen,setIsOpen]=useState(false);
  
  const createDocument = useMutation(api.document.createDocument);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
    <DialogTrigger asChild>
        {/* By default, DialogTrigger wraps its children in a button element
            It would create a button inside another button, which is invalid HTML
            With asChild it tells the component to not create a new DOM element
            Instead, it clones the child element and passes the necessary props to it
            This allows you to use your own custom trigger element 
*/}
    <Button onClick={()=>{
          createDocument({title:"Hello World"})
        }}> Upload Document
        </Button> 
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload a Document ?</DialogTitle>
        <DialogDescription>
          Upload a team document for you to search over in the futures.
        </DialogDescription>
        <UploadDocumentForm onUpload={()=> setIsOpen(false)}/>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  );
}