import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { ReactNode } from 'react'

export default function LoadingButton(
    {isLoading,children,loadingText}:
    {   isLoading:boolean; 
        children:ReactNode ;
        loadingText:String}) {
  return (
    <React.Fragment>
            <Button type="submit" disabled={isLoading} className='flex gap-1 items-center'>
            {isLoading && <Loader2 className='animate-spin'/>}
            {isLoading ? loadingText:children}
           </Button>

    </React.Fragment>
  )
}
