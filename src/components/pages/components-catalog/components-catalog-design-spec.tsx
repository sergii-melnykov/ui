/**
 * Storybook-only layout mirroring the Figma Components index (node 2429:383).
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, BookOpen, SquareTerminal } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/atoms/tooltip/tooltip"
import { cn } from "@/utils/index"

import {
  ALL_COMPONENTS,
  getCatalogLinksForStoryEntry,
  NEW_COMPONENTS
} from "./components-catalog-data"
import { getComponentPreview } from "./components-catalog-previews"
import {
  buildCatalogCardEntries,
  type CatalogCardEntry,
  type StoryIndexSnapshot
} from "./components-catalog-story-index"
import { useStorybookIndex } from "./components-catalog-use-story-index"

const newComponentSet = new Set<string>(NEW_COMPONENTS)

const LAYER_ORDER = ["Atoms", "Molecules", "Organisms", "Form"] as const

function CatalogIconLink({
  href,
  external,
  label,
  children
}: {
  href: string
  external?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="size-8 shrink-0" asChild>
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            aria-label={label}
          >
            {children}
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

function ComponentCatalogItem({ entry }: { entry: CatalogCardEntry }) {
  const { storybookHref, shadcnHref } = getCatalogLinksForStoryEntry(entry)
  const preview = getComponentPreview({
    catalogName: entry.catalogName,
    title: entry.title,
    label: entry.label
  })
  const isNew = entry.catalogName ? newComponentSet.has(entry.catalogName) : false

  return (
    <article
      className={cn(
        "flex min-h-[17rem] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs",
        "transition-shadow hover:shadow-md"
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-border/80 bg-muted/30 px-5 py-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold leading-6 text-foreground">
              {entry.label}
            </h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {entry.layer}
            </span>
            {isNew ? (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                New
              </span>
            ) : null}
          </div>
          <p className="truncate text-xs text-muted-foreground">{entry.title}</p>
        </div>

        <div
          className="flex shrink-0 items-center gap-0.5 rounded-lg border border-border/60 bg-background p-0.5 shadow-xs"
          role="group"
          aria-label={`Links for ${entry.label}`}
        >
          {storybookHref ? (
            <CatalogIconLink href={storybookHref} label="Open in Storybook">
              <BookOpen className="size-4" aria-hidden />
            </CatalogIconLink>
          ) : null}
          {shadcnHref ? (
            <CatalogIconLink href={shadcnHref} external label="Open shadcn/ui docs">
              <SquareTerminal className="size-4" aria-hidden />
            </CatalogIconLink>
          ) : null}
        </div>
      </header>

      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-4 p-8",
          "bg-linear-to-b from-muted/15 to-muted/40"
        )}
      >
        <div
          className={cn(
            "flex w-full max-w-sm min-h-[7.5rem] flex-1 items-center justify-center",
            "rounded-lg border border-dashed border-border/80 bg-background/80 px-6 py-5 shadow-inner"
          )}
        >
          <div className="pointer-events-none flex w-full items-center justify-center [&_*]:max-w-full">
            {preview}
          </div>
        </div>
      </div>
    </article>
  )
}

function ComponentGrid({ entries }: { entries: readonly CatalogCardEntry[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      {entries.map((entry) => (
        <ComponentCatalogItem key={entry.storyId} entry={entry} />
      ))}
    </div>
  )
}

function CatalogByLayer({ snapshot }: { snapshot: StoryIndexSnapshot }) {
  const entries = React.useMemo(
    () => buildCatalogCardEntries(snapshot, ALL_COMPONENTS),
    [snapshot]
  )

  const byLayer = React.useMemo(() => {
    const map = new Map<string, CatalogCardEntry[]>()
    for (const entry of entries) {
      const list = map.get(entry.layer) ?? []
      list.push(entry)
      map.set(entry.layer, list)
    }
    return map
  }, [entries])

  return (
    <div className="flex flex-col gap-14">
      {LAYER_ORDER.map((layer) => {
        const layerEntries = byLayer.get(layer)
        if (!layerEntries?.length) return null
        return (
          <section key={layer} className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold leading-7 text-foreground">{layer}</h2>
              <p className="text-sm text-muted-foreground">{layerEntries.length} components</p>
            </div>
            <ComponentGrid entries={layerEntries} />
          </section>
        )
      })}
    </div>
  )
}

export function ComponentsCatalogDesignSpec() {
  const { snapshot, loading, error } = useStorybookIndex()
  const totalCount = snapshot?.groups.length ?? 0

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-xl border border-border bg-background p-10 md:p-14">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h1 className="text-3xl font-semibold leading-9 tracking-normal text-foreground">
              Components
            </h1>
            <p className="text-base leading-6 text-muted-foreground">
              Every component story in this Storybook ({totalCount || "…"} entries). Shadcn links
              appear when the component matches the shadcn/ui index.
            </p>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading Storybook index…</p>
            ) : null}
            {error ? (
              <p className="text-sm text-destructive">
                Could not load Storybook index. Refresh the page to load the full catalog.
              </p>
            ) : null}
          </div>
          <Button variant="outline" className="h-8 shrink-0 shadow-xs" asChild>
            <a href="https://ui.shadcn.com/docs/components" target="_blank" rel="noreferrer">
              All on Shadcn
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </header>

        {snapshot ? (
          <CatalogByLayer snapshot={snapshot} />
        ) : loading ? (
          <p className="text-sm text-muted-foreground">Preparing component list…</p>
        ) : null}
      </div>
    </TooltipProvider>
  )
}
