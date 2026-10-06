"use client"

import * as React from "react"
import { Hexagon, TrendingUp } from "lucide-react"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart
} from "recharts"

import { Card } from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "./chart"
import {
  radarChartConfig,
  radarChartConfigDual,
  radarChartData,
  radarChartDataDual,
  radarChartDataGridFill,
  radarChartDataLinesOnly
} from "./chart-radar-demo-data"

const RADAR_DESCRIPTION = "Showing total visitors for the last 6 months"

function RadarChartTrendFooter() {
  return (
    <div className="flex flex-col items-center gap-2 px-6">
      <div className="flex items-center gap-2 text-sm font-medium leading-5">
        Trending up by 5.2% this month
        <TrendingUp className="size-4 shrink-0" aria-hidden />
      </div>
      <p className="text-center text-sm leading-5 text-muted-foreground">January - June 2024</p>
    </div>
  )
}

function RadarExampleCard({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0 shadow-none", className)}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5 pl-1">
        <Hexagon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="text-[13px] leading-5 text-muted-foreground">Radar Chart</span>
      </div>
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-1.5 px-6">
          <h3 className="text-base font-semibold leading-6 text-card-foreground">{title}</h3>
          <p className="text-sm leading-5 text-muted-foreground">{RADAR_DESCRIPTION}</p>
        </div>
        <div className="px-6">{children}</div>
        <RadarChartTrendFooter />
      </div>
    </Card>
  )
}

export function ChartRadarDefaultExample() {
  return (
    <RadarExampleCard title="Radar Chart">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartData]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarDotsExample() {
  return (
    <RadarExampleCard title="Radar Chart - Dots">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartData]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1
            }}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarLinesOnlyExample() {
  return (
    <RadarExampleCard title="Radar Chart - Lines Only">
      <ChartContainer
        config={radarChartConfigDual satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartDataLinesOnly]}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid radialLines={false} />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
          <Radar
            dataKey="mobile"
            fill="var(--color-mobile)"
            fillOpacity={0}
            stroke="var(--color-mobile)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarLabelCustomExample() {
  return (
    <RadarExampleCard title="Radar Chart - Custom Label">
      <ChartContainer
        config={radarChartConfigDual satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart
          data={[...radarChartDataDual]}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
          }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis
            dataKey="month"
            tick={({ x, y, textAnchor, index, ...props }) => {
              const data = radarChartDataDual[index]
              const yValue = typeof y === "number" ? y : 0

              return (
                <text
                  x={x}
                  y={yValue + (index === 0 ? -10 : 0)}
                  textAnchor={textAnchor}
                  fontSize={13}
                  fontWeight={500}
                  {...props}
                >
                  <tspan>{data.desktop}</tspan>
                  <tspan className="fill-muted-foreground">/</tspan>
                  <tspan>{data.mobile}</tspan>
                  <tspan x={x} dy="1rem" fontSize={12} className="fill-muted-foreground">
                    {data.month}
                  </tspan>
                </text>
              )
            }}
          />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
          <Radar dataKey="mobile" fill="var(--color-mobile)" />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarGridCustomExample() {
  return (
    <RadarExampleCard title="Radar Chart - Grid Custom">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartData]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarGrid radialLines={false} polarRadius={[90]} strokeWidth={1} />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarGridNoneExample() {
  return (
    <RadarExampleCard title="Radar Chart - Grid None">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartData]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1
            }}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarGridCircleExample() {
  return (
    <RadarExampleCard title="Radar Chart - Grid Circle">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartData]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1
            }}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarGridCircleNoLinesExample() {
  return (
    <RadarExampleCard title="Radar Chart - Grid Circle - No lines">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartDataGridFill]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarGrid gridType="circle" radialLines={false} />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1
            }}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarGridCircleFillExample() {
  return (
    <RadarExampleCard title="Radar Chart - Grid Circle Filled">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartDataGridFill]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarGrid
            className="fill-(--color-desktop) opacity-20"
            gridType="circle"
          />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarGridFillExample() {
  return (
    <RadarExampleCard title="Radar Chart - Grid Filled">
      <ChartContainer
        config={radarChartConfig satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartDataGridFill]}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarGrid className="fill-(--color-desktop) opacity-20" />
          <PolarAngleAxis dataKey="month" />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarMultipleExample() {
  return (
    <RadarExampleCard title="Radar Chart - Multiple">
      <ChartContainer
        config={radarChartConfigDual satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart data={[...radarChartDataDual]}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
          <Radar dataKey="mobile" fill="var(--color-mobile)" />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}

export function ChartRadarLegendExample() {
  return (
    <RadarExampleCard title="Radar Chart - Legend">
      <ChartContainer
        config={radarChartConfigDual satisfies ChartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadarChart
          data={[...radarChartDataDual]}
          margin={{
            top: -40,
            bottom: -10,
            left: 0,
            right: 0
          }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
          <Radar dataKey="mobile" fill="var(--color-mobile)" />
          <ChartLegend className="mt-8" content={<ChartLegendContent />} />
        </RadarChart>
      </ChartContainer>
    </RadarExampleCard>
  )
}
