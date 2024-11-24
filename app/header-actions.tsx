import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Authenticated, AuthLoading } from 'convex/react'
import { SignInButton } from '@clerk/nextjs'
import { Unauthenticated } from 'convex/react'

export default function HeaderActions() {
  return (
    <React.Fragment>
        <Unauthenticated>
            <SignInButton />
        </Unauthenticated>
         <Authenticated>
            <UserButton />
        </Authenticated>
        <AuthLoading>Loading...</AuthLoading>
    </React.Fragment>
  )
}
