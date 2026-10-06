"use client"

import * as React from "react"
import { GitCommitVertical } from "lucide-react"
import {
  CartesianGrid,
  Dot,
  LabelList,
  Line,
  LineChart,
  XAxis
} from "recharts"

import { cn } from "@/utils/index"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "./chart"
import { chartLineBrowserData, chartLineMonthlyData } from "./chart-line-data"
import {
  ChartLineExampleBody,
  ChartLineShell,
  ChartLineTrendFooter,
  ChartLineVariantHeader
} from "./chart-line-shell"

type MonthSeriesPayload = { month: string }
type BrowserSeriesPayload = { browser: string; fill: string }

const monthlyDesktopConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

const monthlyDualConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

const browserChartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)"
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)"
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)"
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)"
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)"
  },
  other: {
    label: "Other",
    color: "var(--chart-5)"
  }
} satisfies ChartConfig

const monthTickFormatter = (value: string) => value.slice(0, 3)

function LineChartExampleCard({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <ChartLineShell className={cn("h-full", className)}>
      <ChartLineExampleBody>
        <ChartLineVariantHeader title={title} description="January - June 2024" />
        <div className="px-6">{children}</div>
        <ChartLineTrendFooter />
      </ChartLineExampleBody>
    </ChartLineShell>
  )
}

export function ChartLineDefault({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart" className={className}>
      <ChartContainer config={monthlyDesktopConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineLinear({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Linear" className={className}>
      <ChartContainer config={monthlyDesktopConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="linear"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineStep({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Step" className={className}>
      <ChartContainer config={monthlyDesktopConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="step"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineMultiple({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Multiple" className={className}>
      <ChartContainer config={monthlyDualConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineDots({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Dots" className={className}>
      <ChartContainer config={monthlyDesktopConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)"
            }}
            activeDot={{
              r: 6
            }}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineDotsCustom({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Custom Dots" className={className}>
      <ChartContainer config={monthlyDesktopConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={({ cx, cy, payload }: { cx?: number; cy?: number; payload: MonthSeriesPayload }) => {
              if (cx == null || cy == null) {
                return null
              }

              const r = 24

              return (
                <GitCommitVertical
                  key={payload.month}
                  x={cx - r / 2}
                  y={cy - r / 2}
                  width={r}
                  height={r}
                  fill="var(--background)"
                  stroke="var(--color-desktop)"
                />
              )
            }}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineDotsColors({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Dots Colors" className={className}>
      <ChartContainer config={browserChartConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineBrowserData]}
          margin={{
            top: 24,
            left: 24,
            right: 24
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent indicator="line" nameKey="visitors" hideLabel />
            }
          />
          <Line
            dataKey="visitors"
            type="natural"
            stroke="var(--color-visitors)"
            strokeWidth={2}
            dot={({
              payload,
              ...props
            }: {
              payload: BrowserSeriesPayload
              cx?: number
              cy?: number
            }) => {
              return (
                <Dot
                  key={payload.browser}
                  r={5}
                  cx={props.cx}
                  cy={props.cy}
                  fill={payload.fill}
                  stroke={payload.fill}
                />
              )
            }}
          />
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineLabel({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Label" className={className}>
      <ChartContainer config={monthlyDesktopConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineMonthlyData]}
          margin={{
            top: 20,
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={monthTickFormatter}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)"
            }}
            activeDot={{
              r: 6
            }}
          >
            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
          </Line>
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}

export function ChartLineLabelCustom({ className }: { className?: string }) {
  return (
    <LineChartExampleCard title="Line Chart - Custom Label" className={className}>
      <ChartContainer config={browserChartConfig} className="aspect-auto h-[188px] w-full">
        <LineChart
          accessibilityLayer
          data={[...chartLineBrowserData]}
          margin={{
            top: 24,
            left: 24,
            right: 24
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent indicator="line" nameKey="visitors" hideLabel />
            }
          />
          <Line
            dataKey="visitors"
            type="natural"
            stroke="var(--color-visitors)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-visitors)"
            }}
            activeDot={{
              r: 6
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
              dataKey="browser"
              formatter={(value) => {
                if (typeof value !== "string") {
                  return value
                }
                const key = value as keyof typeof browserChartConfig
                return key in browserChartConfig ? browserChartConfig[key].label : value
              }}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </LineChartExampleCard>
  )
}
