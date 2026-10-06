/**
 * Storybook-only layout mirroring the Figma Featured page (node 1088:8221).
 * Not exported from the library package.
 */

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"

import { FeaturedDashboardDemo } from "./featured-dashboard-demo"

export function FeaturedDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-14 bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold tracking-normal text-foreground">Featured</h1>
        <Button variant="outline" className="h-8 shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/blocks" target="_blank" rel="noreferrer">
            View blocks
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="sr-only">A dashboard with sidebar, charts and data table</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <FeaturedDashboardDemo />
        </div>
      </section>

      <Separator />
      <p className="text-sm text-muted-foreground">
        Additional Featured blocks from Figma (collapsible sidebar, login layouts) can be added as
        separate demos following the same pattern.
      </p>
    </div>
  )
}
