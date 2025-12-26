import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-background text-foreground">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
