/**
 * Storybook-only layout mirroring the Figma Bar Chart documentation page (node 846:33161).
 * Not exported from the library package.
 */

import type { ReactNode } from "react"
import { ArrowUpRight, ChartBarBig } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { cn } from "@/utils/index"

import {
  ChartBarActive,
  ChartBarCustomLabel,
  ChartBarDefault,
  ChartBarHorizontal,
  ChartBarLabel,
  ChartBarMixed,
  ChartBarMultiple,
  ChartBarNegative,
  ChartBarStackedLegend
} from "./chart-bar-demos"
import { ChartInteractiveBar } from "./chart-interactive-bar"

function ChartPreviewFrame({
  title = "Chart",
  children,
  className
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-xs", className)}>
      <div className="flex h-10 items-center gap-2 border-b border-border px-3">
        <ChartBarBig className="size-3.5 text-muted-foreground" aria-hidden />
        <span className="text-sm font-medium leading-5 text-foreground">{title}</span>
      </div>
      <div className="[&_[data-slot=card]]:rounded-none [&_[data-slot=card]]:border-0 [&_[data-slot=card]]:shadow-none">
        {children}
      </div>
    </div>
  )
}

export function ChartDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h1 className="text-3xl font-semibold leading-10 text-foreground">Bar Chart</h1>
        <Button variant="outline" className="h-8 shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/charts/bar#charts" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <ChartPreviewFrame title="Bar Chart">
        <ChartInteractiveBar className="max-w-none" />
      </ChartPreviewFrame>

      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <ChartPreviewFrame>
          <ChartBarDefault />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarHorizontal />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarMultiple />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarStackedLegend />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarLabel />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarCustomLabel />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarMixed />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarActive />
        </ChartPreviewFrame>
        <ChartPreviewFrame>
          <ChartBarNegative />
        </ChartPreviewFrame>
      </div>
    </div>
  )
}
