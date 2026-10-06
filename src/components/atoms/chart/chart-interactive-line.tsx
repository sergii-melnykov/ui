"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { cn } from "@/utils/index"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "./chart"
import { chartDemoData } from "./chart-demo-data"
import { ChartLineExampleBody, ChartLineShell } from "./chart-line-shell"

const chartConfig = {
  views: {
    label: "Page Views"
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

type SeriesKey = "desktop" | "mobile"

export function ChartInteractiveLine({ className }: { className?: string }) {
  const [activeChart, setActiveChart] = React.useState<SeriesKey>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartDemoData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartDemoData.reduce((acc, curr) => acc + curr.mobile, 0)
    }),
    []
  )

  return (
    <ChartLineShell className={cn("w-full", className)}>
      <div className="flex flex-col border-b border-border sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          <h3 className="text-base font-semibold leading-6 text-foreground">
            Line Chart - Interactive
          </h3>
          <p className="text-sm leading-5 text-muted-foreground">
            Showing total visitors for the last 3 months
          </p>
        </div>
        <div className="flex border-t border-border sm:border-t-0">
          {(["desktop", "mobile"] as const).map((key) => (
            <button
              key={key}
              type="button"
              data-active={activeChart === key}
              className="relative flex flex-1 flex-col justify-center gap-1 border-border px-8 py-6 text-left even:border-l data-[active=true]:bg-muted sm:w-[171px] sm:border-t-0 sm:border-l"
              onClick={() => {
                setActiveChart(key)
              }}
            >
              <span className="text-xs leading-4 text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-3xl leading-9 font-bold tabular-nums text-foreground">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>
      <ChartLineExampleBody>
        <div className="px-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={[...chartDemoData]}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value: string) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(String(value)).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </ChartLineExampleBody>
    </ChartLineShell>
  )
}
