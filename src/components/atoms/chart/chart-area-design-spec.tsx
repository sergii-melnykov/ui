/**
 * Storybook-only layout mirroring the Figma Area Chart documentation page (node 260:3742).
 * Not exported from the library package.
 */

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import {
  ChartAreaAxesDemo,
  ChartAreaDefaultDemo,
  ChartAreaGradientDemo,
  ChartAreaIconsDemo,
  ChartAreaInteractiveDemo,
  ChartAreaLegendDemo,
  ChartAreaLinearDemo,
  ChartAreaStackedDemo,
  ChartAreaStackedExpandDemo,
  ChartAreaStepDemo
} from "./chart-area-demos"

export function ChartAreaDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 rounded-3xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold leading-10 text-foreground">Area Chart</h1>
        <Button variant="outline" className="h-8 shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/charts/area#area-chart"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <ChartAreaInteractiveDemo />
        </div>
        <ChartAreaDefaultDemo />
        <ChartAreaLinearDemo />
        <ChartAreaStepDemo />
        <ChartAreaLegendDemo />
        <ChartAreaStackedDemo />
        <ChartAreaStackedExpandDemo />
        <ChartAreaIconsDemo />
        <ChartAreaGradientDemo />
        <ChartAreaAxesDemo />
      </div>
    </div>
  )
}
