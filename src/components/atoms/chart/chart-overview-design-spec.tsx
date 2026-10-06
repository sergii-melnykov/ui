/**
 * Storybook-only layout mirroring the Figma Chart documentation page (node 1937:478).
 * Not exported from the library package.
 */

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { ChartInteractiveBar } from "./chart-interactive-bar"

export function ChartOverviewDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[782px] flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Chart</h1>
          <p className="text-base leading-6 text-muted-foreground">
            Beautiful charts. Built using Recharts. Copy and paste into your apps.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/chart"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <ChartInteractiveBar className="max-w-[670px]" />
    </div>
  )
}
