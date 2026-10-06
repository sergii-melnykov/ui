/**
 * Storybook-only layout mirroring the Figma Line Chart documentation page.
 * Not exported from the library package.
 */

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { ChartInteractiveLine } from "./chart-interactive-line"
import {
  ChartLineDefault,
  ChartLineDots,
  ChartLineDotsColors,
  ChartLineDotsCustom,
  ChartLineLabel,
  ChartLineLabelCustom,
  ChartLineLinear,
  ChartLineMultiple,
  ChartLineStep
} from "./chart-line-examples"

export function ChartLineDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[1336px] flex-col gap-10 rounded-3xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold leading-10 text-foreground">Line Chart</h1>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/charts/line#charts"
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
          <ChartInteractiveLine />
        </div>
        <ChartLineDefault />
        <ChartLineLinear />
        <ChartLineStep />
        <ChartLineMultiple />
        <ChartLineDots />
        <ChartLineDotsCustom />
        <ChartLineDotsColors />
        <ChartLineLabel />
        <ChartLineLabelCustom />
      </div>
    </div>
  )
}
