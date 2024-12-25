"use client";


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
import { Upload } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { useToast } from "@/hooks/use-toast"


export default function UploadDocumentButton() {
    const [isOpen,setIsOpen]=useState(false);
    const { toast } = useToast();
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
    <DialogTrigger asChild>
        {/* By default, DialogTrigger wraps its children in a button element
            It would create a button inside another button, which is invalid HTML
            With asChild it tells the component to not create a new DOM element
            Instead, it clones the child element and passes the necessary props to it
            This allows you to use your own custom trigger element 
*/}
     <Button className={btnStyles}>
          <Upload className={btnIconStyles} /> Upload Document
        </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload a Document.</DialogTitle>
        <DialogDescription>
        &quot;Upload a team document for you to search over in the futures.&quot;
        </DialogDescription>
        <UploadDocumentForm onUpload={()=> {setIsOpen(false);
           toast({
            title: "File Uploaded.",
            description: "Your file has been uplaoded successfully.",
          })
        }}/>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  );
}