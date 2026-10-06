/**
 * Storybook-only layout mirroring the Figma Lucide Icons documentation page (node 1086:1066).
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, icons, type LucideIcon } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { cn } from "@/utils/index"

const FIGMA_LUCIDE_COMMUNITY_URL =
  "https://www.figma.com/community/file/983840782520404978/lucide-icons-full-collection-1564-icons"

const sortedIcons = Object.entries(icons).sort(([a], [b]) => a.localeCompare(b))

function IconCell({ name, Icon }: { name: string; Icon: LucideIcon }) {
  return (
    <div
      className="flex size-6 shrink-0 items-center justify-center text-foreground"
      title={name}
    >
      <Icon className="size-6" strokeWidth={1.5} aria-hidden />
    </div>
  )
}

export function LucideIconsDesignSpec() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-10 bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold leading-10 text-foreground">Lucide Icons</h1>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl px-3 shadow-xs" asChild>
          <a href={FIGMA_LUCIDE_COMMUNITY_URL} target="_blank" rel="noreferrer">
            View in Figma
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div
        className={cn(
          "flex w-full flex-wrap content-start",
          "gap-x-[25.76px] gap-y-[26.93px]"
        )}
        aria-label="Lucide icon set"
      >
        {sortedIcons.map(([name, Icon]) => (
          <IconCell key={name} name={name} Icon={Icon} />
        ))}
      </div>
    </div>
  )
}
