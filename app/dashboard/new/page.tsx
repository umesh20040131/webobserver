import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import WebsiteForm from './_components/websiteform'

function AddWebsite() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <Link href="/dashboard" className="inline-block mb-8">
          <Button variant="outline" className="gap-2">
            ← Dashboard
          </Button>
        </Link>
        <Card className="bg-card shadow-lg p-8">
          <WebsiteForm />
        </Card>
      </div>
    </div>
  )
}

export default AddWebsite
