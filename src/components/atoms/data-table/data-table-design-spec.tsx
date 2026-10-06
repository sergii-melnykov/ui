/**
 * Storybook-only layout mirroring the Figma Data Table documentation page (node 2131:401).
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"

import { DataTableDemo } from "./data-table-demo"

export function DataTableDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex items-start gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 tracking-normal text-foreground">
            Data Table
          </h1>
          <p className="text-base leading-6 text-muted-foreground">
            Powerful table and datagrids built using TanStack Table.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/data-table"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <section className="flex flex-col">
        <h2 className="text-xl font-semibold leading-7 text-foreground">Examples</h2>
        <div className="flex w-full flex-col items-center pt-6">
          <div className="w-full max-w-[558px]">
            <DataTableDemo />
          </div>
        </div>
      </section>
    </div>
  )
}
