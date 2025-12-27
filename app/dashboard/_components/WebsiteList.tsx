"use client"

import { WebsiteCard } from "./WebsiteCard"

interface WebsiteListProps {
  websites: Array<{
    websiteId: string
    domain: string
    timezone: string
  }>
}

export function WebsiteList({ websites }: WebsiteListProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((website) => (
        <WebsiteCard 
          key={website.websiteId} 
          websiteId={website.websiteId}
          domain={website.domain} 
          timezone={website.timezone}
        />
      ))}
    </section>
  )
}
