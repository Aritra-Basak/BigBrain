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
import { useOrganization } from "@clerk/nextjs";
import {useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingButton from '../../loading-button';
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
    text: z.string().min(1).max(5000),
  })
  /**This uses Zod (a TypeScript-first schema validation library) to define the form's data structure */
 
export default function CreateNoteForm({onNoteCreated}:{onNoteCreated:()=>void}) {
    // The API from Conver provides type-safe access to all your Convex backend functions (mutations and queries)
    //useMutation is a React hook that connects to a Convex mutation function
    const createNote = useMutation(api.notes.createNote);
    const organization = useOrganization();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          text: "",
        },
      });  

    async function onSubmit(values:z.infer<typeof formSchema>){
        await createNote({
            text:values.text,
            orgId: organization.organization?.id,
        })
        onNoteCreated();
      }
  return (
    <React.Fragment>
      <Form {...form}>
          
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea rows={8} placeholder="Your Note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton 
            isLoading={form.formState.isSubmitting}
            loadingText="Creating..."
            >
                Create
            </LoadingButton>
      </form>
    </Form>
    </React.Fragment>
  )
}
