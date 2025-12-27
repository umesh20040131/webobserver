"use client"

import { Card } from "@/components/ui/card"
import { GlobeIcon } from "lucide-react"
import { MiniAreaChart } from "./MiniAreaChart"

interface WebsiteCardProps {
  domain: string
  timezone: string
}

export function WebsiteCard({ domain, timezone }: WebsiteCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <GlobeIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{domain}</h3>
            <p className="text-sm text-muted-foreground">{timezone}</p>
          </div>
        </div>
      </div>
      
      {/* Mini Area Chart */}
      <div className="mb-4">
        <MiniAreaChart />
      </div>
      
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Last 7 days</p>
      </div>
    </Card>
  )
}
