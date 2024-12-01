"use client";

import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import {useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingButton from '../../loading-button';
import { useOrganization } from "@clerk/nextjs";
import { Id } from '@/convex/_generated/dataModel';


const formSchema = z.object({
    title: z.string().min(2).max(250),
    file:z.instanceof(File),
  })
  /**This uses Zod (a TypeScript-first schema validation library) to define the form's data structure */
 
export default function UploadDocumentForm({onUpload}:{onUpload:()=>void}) {
    // The API from Conver provides type-safe access to all your Convex backend functions (mutations and queries)
    //useMutation is a React hook that connects to a Convex mutation function
    const createDocument = useMutation(api.document.createDocument);
    const generateUploadUrl = useMutation(api.document.generateUploadUrl);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
      });  

    async function onSubmit(values:z.infer<typeof formSchema>){
        //To Post the uploaded file to the convex backend via a secure link.
        const postUrl = await generateUploadUrl();
        //console.log(postUrl)
        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.file.type },
        body: values.file,
        });
        const { storageId } = await result.json();
        await createDocument({
            title:values.title,
            fileId : storageId as Id<"_storage">,
        })
        onUpload();
      }
  return (
    <React.Fragment>
      <Form {...form}>
          
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Header</FormLabel>
              <FormControl>
                <Input placeholder="Document Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field:{value,onChange,...fieldProps} }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input 
                {...fieldProps}
                type='file'
                accept='.txt,.xml,.doc'
                onChange={(event)=>{
                    const file =event.target.files?.[0];
                    onChange(file)
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton 
            isLoading={form.formState.isSubmitting}
            loadingText="Uploading..."
            >
                Upload
            </LoadingButton>
      </form>
    </Form>
    </React.Fragment>
  )
}
