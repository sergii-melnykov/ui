/**
 * Storybook-only layout mirroring the Figma Scroll-area documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { ScrollArea, ScrollBar } from "./scroll-area"

const HORIZONTAL_GALLERY = [
  {
    src: "/scroll-area/gallery-1.png",
    author: "Ornella Binni"
  },
  {
    src: "/scroll-area/gallery-2.png",
    author: "Tom Byrom"
  },
  {
    src: "/scroll-area/gallery-3.png",
    author: "Vladimir Malyavko"
  }
] as const

const RTL_VERSIONS = [
  "v1.2.0-beta.50",
  "v1.2.0-beta.49",
  "v1.2.0-beta.48",
  "v1.2.0-beta.47",
  "v1.2.0-beta.46",
  "v1.2.0-beta.45",
  "v1.2.0-beta.44",
  "v1.2.0-beta.43",
  "v1.2.0-beta.42",
  "v1.2.0-beta.41",
  "v1.2.0-beta.40"
] as const

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10">
      {children}
    </div>
  )
}

function ExampleBlock({
  title,
  description,
  children
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      <p className="pt-4 text-base text-muted-foreground">{description}</p>
      <div className="pt-6">{children}</div>
    </div>
  )
}

function ScrollbarThumbPreview({ orientation }: { orientation: "vertical" | "horizontal" }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-full bg-border",
        orientation === "vertical" ? "h-12 w-1.5" : "h-1.5 w-12"
      )}
      aria-hidden
    />
  )
}

function ScrollbarOrientationLabel({
  label,
  orientation
}: {
  label: string
  orientation: "vertical" | "horizontal"
}) {
  return (
    <div className="flex w-[60px] flex-col items-center gap-6">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex h-3 w-full items-center justify-center" aria-hidden>
        <div className="h-3 w-full rounded-lg border-b border-foreground" />
      </div>
      <ScrollbarThumbPreview orientation={orientation} />
    </div>
  )
}

function PhotoCard({ src, author }: { src: string; author: string }) {
  return (
    <div className="flex shrink-0 flex-col">
      <img
        src={src}
        alt=""
        className="h-[200px] w-[150px] rounded-md object-cover"
        loading="lazy"
      />
      <p className="flex items-center gap-0.5 pt-2 text-xs text-muted-foreground">
        <span>Photo by</span>
        <span className="font-semibold text-foreground">{author}</span>
      </p>
    </div>
  )
}

function HorizontalScrollExample() {
  return (
    <ScrollArea type="always" className="w-[382px] rounded-md border bg-background">
      <div className="flex w-max gap-4 p-4">
        {HORIZONTAL_GALLERY.map((item) => (
          <PhotoCard key={item.author} src={item.src} author={item.author} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

function RtlScrollExample() {
  return (
    <div dir="rtl">
      <ScrollArea type="always" className="h-[288px] shrink-0 rounded-md border bg-background">
        <div className="p-4">
          <p className="mb-4 text-right text-sm font-medium text-foreground">العلامات</p>
          <div className="flex w-[158px] flex-col">
            {RTL_VERSIONS.map((version, index) => (
              <React.Fragment key={version}>
                <p className="text-right text-sm text-foreground">{version}</p>
                {index < RTL_VERSIONS.length - 1 ? (
                  <div className="py-2">
                    <Separator />
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export function ScrollAreaDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Scroll-area</h1>
          <p className="text-base text-muted-foreground">
            Augments native scroll functionality for custom, cross-browser styling.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/scroll-area"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <section className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>
        <h3 className="text-xl font-semibold text-foreground">Scroll-area</h3>
        <div className="flex flex-wrap gap-4 rounded-xl border border-dashed border-border p-5">
          <div className="flex gap-6">
            <ScrollbarOrientationLabel label="Vertical" orientation="vertical" />
            <ScrollbarOrientationLabel label="Horizontal" orientation="horizontal" />
          </div>
        </div>
      </section>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Horizontal"
          description={
            <>
              Use <code>ScrollBar</code> with <code>orientation=&quot;horizontal&quot;</code> for
              horizontal scrolling.
            </>
          }
        >
          <PreviewBox>
            <HorizontalScrollExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <RtlScrollExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
