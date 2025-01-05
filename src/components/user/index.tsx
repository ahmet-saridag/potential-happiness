import React from 'react'
import { UserButton, SignedIn } from "@clerk/nextjs";

export default function User() {
  return (
    <>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton  afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}
