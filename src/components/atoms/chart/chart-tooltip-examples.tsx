"use client"

import * as React from "react"
import { Footprints, MousePointer2, Waves } from "lucide-react"
import { Bar, BarChart, XAxis } from "recharts"

import { Card } from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "./chart"
import {
  formatTooltipLongDate,
  formatTooltipWeekdayTick,
  tooltipActivitiesChartConfig,
  tooltipChartData,
  tooltipRunningSwimmingChartConfig
} from "./chart-tooltip-demo-data"

const tooltipIconsChartConfig = {
  running: {
    label: "Running",
    color: "var(--chart-1)",
    icon: Footprints
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)",
    icon: Waves
  }
} satisfies ChartConfig

function runningSwimmingConfigLabel(name: string | number | undefined) {
  const key = String(name ?? "") as keyof typeof tooltipRunningSwimmingChartConfig
  return tooltipRunningSwimmingChartConfig[key].label
}

type RunningSwimmingPayload = {
  running: number
  swimming: number
}

function isRunningSwimmingPayload(payload: unknown): payload is RunningSwimmingPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "running" in payload &&
    "swimming" in payload
  )
}

function TooltipExampleCard({
  title,
  description,
  children,
  className
}: {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0 shadow-none", className)}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5 pl-1">
        <MousePointer2 className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="text-[13px] leading-5 text-muted-foreground">Tooltip</span>
      </div>
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-1.5 px-6">
          <h3 className="text-base font-semibold leading-6 text-card-foreground">{title}</h3>
          <p className="text-sm leading-5 text-muted-foreground">{description}</p>
        </div>
        <div className="px-6">{children}</div>
      </div>
    </Card>
  )
}

function TooltipStackedBarChart({
  config,
  tooltipContent
}: {
  config: ChartConfig
  tooltipContent: React.ReactElement
}) {
  return (
    <ChartContainer config={config} className="aspect-auto h-[214px] w-full">
      <BarChart accessibilityLayer data={[...tooltipChartData]}>
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={formatTooltipWeekdayTick}
        />
        <Bar
          dataKey="running"
          stackId="a"
          fill="var(--color-running)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="swimming"
          stackId="a"
          fill="var(--color-swimming)"
          radius={[4, 4, 0, 0]}
        />
        <ChartTooltip content={tooltipContent} cursor={false} defaultIndex={1} />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartTooltipDefaultExample() {
  return (
    <TooltipExampleCard
      title="Tooltip - Default"
      description="Default tooltip with ChartTooltipContent."
    >
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={<ChartTooltipContent />}
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipLineIndicatorExample() {
  return (
    <TooltipExampleCard
      title="Tooltip - Line Indicator"
      description="Tooltip with line indicator."
    >
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={<ChartTooltipContent indicator="line" />}
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipNoIndicatorExample() {
  return (
    <TooltipExampleCard title="Tooltip - No Indicator" description="Tooltip with no indicator.">
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={<ChartTooltipContent hideIndicator />}
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipCustomLabelExample() {
  return (
    <TooltipExampleCard
      title="Tooltip - Custom Label"
      description="Tooltip with custom label from chartConfig."
    >
      <TooltipStackedBarChart
        config={tooltipActivitiesChartConfig}
        tooltipContent={<ChartTooltipContent labelKey="activities" indicator="line" />}
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipLabelFormatterExample() {
  return (
    <TooltipExampleCard
      title="Tooltip - Label Formatter"
      description="Tooltip with label formatter."
    >
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={
          <ChartTooltipContent labelFormatter={(value) => formatTooltipLongDate(String(value))} />
        }
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipNoLabelExample() {
  return (
    <TooltipExampleCard title="Tooltip - No Label" description="Tooltip with no label.">
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={<ChartTooltipContent hideIndicator hideLabel />}
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipFormatterExample() {
  return (
    <TooltipExampleCard
      title="Tooltip - Formatter"
      description="Tooltip with custom formatter ."
    >
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={
          <ChartTooltipContent
            hideLabel
            formatter={(value, name) => (
              <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                {runningSwimmingConfigLabel(name)}
                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                  {value}
                  <span className="font-normal text-muted-foreground">kcal</span>
                </div>
              </div>
            )}
          />
        }
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipIconsExample() {
  return (
    <TooltipExampleCard title="Tooltip - Icons" description="Tooltip with icons.">
      <TooltipStackedBarChart
        config={tooltipIconsChartConfig}
        tooltipContent={<ChartTooltipContent hideLabel />}
      />
    </TooltipExampleCard>
  )
}

export function ChartTooltipAdvancedExample() {
  return (
    <TooltipExampleCard
      title="Tooltip - Advanced"
      description="Tooltip with custom formatter and total."
    >
      <TooltipStackedBarChart
        config={tooltipRunningSwimmingChartConfig}
        tooltipContent={
          <ChartTooltipContent
            hideLabel
            className="w-[180px]"
            formatter={(value, name, item, index) => (
              <>
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                  style={
                    {
                      "--color-bg": `var(--color-${String(name)})`
                    } as React.CSSProperties
                  }
                />
                {runningSwimmingConfigLabel(name)}
                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                  {value}
                  <span className="font-normal text-muted-foreground">kcal</span>
                </div>
                {index === 1 && (
                  <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                    Total
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                      {isRunningSwimmingPayload(item.payload)
                        ? item.payload.running + item.payload.swimming
                        : 0}
                      <span className="font-normal text-muted-foreground">kcal</span>
                    </div>
                  </div>
                )}
              </>
            )}
          />
        }
      />
    </TooltipExampleCard>
  )
}
