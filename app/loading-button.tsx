import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { MouseEvent, ReactNode } from "react";

export default function LoadingButton(
    {isLoading,children,loadingText,onClick}:
    {   isLoading:boolean; 
        children:ReactNode ;
        loadingText:string,
        onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;}) {
  return (
    <React.Fragment>
            <Button type="submit" disabled={isLoading} className='flex gap-1 items-center' onClick={(e) => {
        onClick?.(e);
      }}>
            {isLoading && <Loader2 className='animate-spin'/>}
            {isLoading ? loadingText:children}
           </Button>

    </React.Fragment>
  )
}
