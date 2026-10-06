/**
 * Storybook-only layout mirroring the Figma Radial Chart documentation page (node 867:10759).
 * Not exported from the library package.
 */

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import {
  ChartRadialDefaultExample,
  ChartRadialGridExample,
  ChartRadialLabelExample,
  ChartRadialShapeExample,
  ChartRadialStackedExample,
  ChartRadialTextExample
} from "./chart-radial-examples"

const RADIAL_EXAMPLES = [
  ChartRadialDefaultExample,
  ChartRadialLabelExample,
  ChartRadialGridExample,
  ChartRadialTextExample,
  ChartRadialShapeExample,
  ChartRadialStackedExample
] as const

export function ChartRadialDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[1449px] flex-col gap-10 rounded-3xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold leading-10 text-foreground">Radial Chart</h1>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl px-3 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/charts/radial#charts"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" className="size-4" />
          </a>
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {RADIAL_EXAMPLES.map((Example) => (
          <Example key={Example.name} />
        ))}
      </div>
    </div>
  )
}
