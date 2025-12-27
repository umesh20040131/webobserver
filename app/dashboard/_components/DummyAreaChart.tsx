"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"

const chartData = [
  {
    date: "Jan 1",
    visitors: 4000,
    pageViews: 2400,
  },
  {
    date: "Jan 2",
    visitors: 3000,
    pageViews: 1398,
  },
  {
    date: "Jan 3",
    visitors: 2000,
    pageViews: 9800,
  },
  {
    date: "Jan 4",
    visitors: 2780,
    pageViews: 3908,
  },
  {
    date: "Jan 5",
    visitors: 1890,
    pageViews: 4800,
  },
  {
    date: "Jan 6",
    visitors: 2390,
    pageViews: 3800,
  },
  {
    date: "Jan 7",
    visitors: 3490,
    pageViews: 4300,
  },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--primary))",
  },
  pageViews: {
    label: "Page Views",
    color: "hsl(var(--secondary))",
  },
}

export function DummyAreaChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>
        <p className="text-sm text-muted-foreground">Last 7 days performance</p>
      </div>
      <ChartContainer config={chartConfig} className="w-full h-80">
        <AreaChart
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            content={<ChartTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.1)" }}
          />
          <Area
            dataKey="visitors"
            type="natural"
            fill="var(--color-visitors)"
            stroke="var(--color-visitors)"
            fillOpacity={0.4}
          />
          <Area
            dataKey="pageViews"
            type="natural"
            fill="var(--color-pageViews)"
            stroke="var(--color-pageViews)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}
