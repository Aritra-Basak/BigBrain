import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Doc } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'

export default function DocumentCard({document}:{document:Doc<'documents'>}) {
  return (
    <div>
        <Card>
  <CardHeader>
    <CardTitle>
        {document.title}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button variant={'secondary'}>View</Button>
  </CardFooter>
</Card>

    </div>
  )
}
