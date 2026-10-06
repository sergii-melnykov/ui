/**
 * Shared layout pieces for Figma-aligned radial chart documentation cards.
 */

import * as React from "react"
import { Radar, TrendingUp } from "lucide-react"

import { cn } from "@/utils/index"

import { radialChartPeriodDescription } from "./chart-radial-demo-data"

export function RadialChartSpecCard({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[419px] flex-col overflow-hidden rounded-xl border border-border bg-background",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border py-2.5 pr-3 pl-4">
        <Radar className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="text-[13px] leading-5 text-muted-foreground">Radial Chart</span>
      </div>
      {children}
    </div>
  )
}

export function RadialChartExampleHeader({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-1.5 px-6">
      <h3 className="text-base font-semibold leading-6 text-foreground">{title}</h3>
      <p className="text-sm leading-5 text-muted-foreground">{description}</p>
    </div>
  )
}

export function RadialChartExampleFooter() {
  return (
    <div className="flex flex-col items-center gap-2 px-6">
      <div className="flex items-center gap-2 text-sm font-medium leading-5 text-foreground">
        Trending up by 5.2% this month
        <TrendingUp className="size-4 shrink-0" aria-hidden />
      </div>
      <p className="text-center text-sm leading-5 text-muted-foreground">
        Showing total visitors for the last 6 months
      </p>
    </div>
  )
}

export function RadialChartExampleBody({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-6 py-6">{children}</div>
}

function RadialChartVariantLayout({
  title,
  children,
  className,
  chartClassName
}: {
  title: string
  children: React.ReactNode
  className?: string
  chartClassName?: string
}) {
  return (
    <RadialChartSpecCard className={className}>
      <RadialChartExampleBody>
        <RadialChartExampleHeader title={title} description={radialChartPeriodDescription} />
        <div className={cn("flex justify-center px-6", chartClassName)}>{children}</div>
        <RadialChartExampleFooter />
      </RadialChartExampleBody>
    </RadialChartSpecCard>
  )
}

export { RadialChartVariantLayout }
