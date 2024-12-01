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
import CreateNoteForm from "./create-note-form";
import { useState } from "react";
import { Upload } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";
  


export default function CreateNoteButton() {
    const [isOpen,setIsOpen]=useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
    <DialogTrigger asChild>
         <Button className={btnStyles}>
          <Upload className={btnIconStyles} /> Create Note
        </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload a Note.</DialogTitle>
        <DialogDescription>
          "Upload a team document for you to search over in the futures."
        </DialogDescription>
        <CreateNoteForm onUpload={()=> setIsOpen(false)}/>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  
  );
}