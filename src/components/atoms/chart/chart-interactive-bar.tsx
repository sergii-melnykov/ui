"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/atoms/chart/chart"
import { cn } from "@/utils/index"

import { chartDemoData } from "./chart-demo-data"

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

export function ChartInteractiveBar({ className }: { className?: string }) {
  const [activeChart, setActiveChart] = React.useState<SeriesKey>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartDemoData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartDemoData.reduce((acc, curr) => acc + curr.mobile, 0)
    }),
    []
  )

  return (
    <Card className={cn("w-full max-w-[670px] py-0", className)}>
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle className="text-sm font-semibold leading-5">Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {(["desktop", "mobile"] as const).map((key) => (
            <button
              key={key}
              type="button"
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-border px-8 py-6 text-left even:border-l data-[active=true]:bg-muted sm:w-[171px] sm:border-t-0 sm:border-l"
              onClick={() => {
                setActiveChart(key)
              }}
            >
              <span className="text-xs text-muted-foreground">{chartConfig[key].label}</span>
              <span className="text-3xl leading-9 font-bold tabular-nums">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
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
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
