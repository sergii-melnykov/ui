/**
 * Storybook-only layout mirroring the Figma Hover Card documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"


function SpecSection({
  title,
  children,
  className
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-xl font-semibold tracking-normal text-foreground">{title}</h3>
      {children}
    </section>
  )
}

function VariantGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 rounded-xl border border-dashed border-border p-5",
        className
      )}
    >
      {children}
    </div>
  )
}

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
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      {description ? <p className="pt-4 text-base text-muted-foreground">{description}</p> : null}
      <div className={cn(description ? "pt-6" : "pt-6")}>{children}</div>
    </div>
  )
}

function ColumnHeaders() {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {(["LTR", "RTL"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-6">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function SpecTrigger({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center justify-center rounded-sm px-2.5 text-xs font-medium text-foreground">
      {children}
    </span>
  )
}

function HoverCardPanel({
  dir = "ltr",
  title,
  description,
  metadata,
  className
}: {
  dir?: "ltr" | "rtl"
  title?: string
  description?: string
  metadata?: string
  className?: string
}) {
  return (
    <div
      dir={dir}
      className={cn(
        "flex w-68 flex-col gap-1 rounded-lg border bg-popover px-4 py-3 text-popover-foreground shadow-md",
        dir === "rtl" && "items-end text-right",
        className
      )}
    >
      {title ? <p className="w-full text-sm font-semibold">{title}</p> : null}
      {description ? <p className="w-full text-sm">{description}</p> : null}
      {metadata ? <p className="w-full text-xs text-muted-foreground">{metadata}</p> : null}
    </div>
  )
}

function SpecHoverCard({
  dir = "ltr",
  title = "Hover card title",
  description = "Hover card description",
  metadata = "Metadata"
}: {
  dir?: "ltr" | "rtl"
  title?: string
  description?: string
  metadata?: string
}) {
  return (
    <HoverCardPanel dir={dir} title={title} description={description} metadata={metadata} />
  )
}

function BasicHoverCardExample() {
  return (
    <div className="flex flex-col items-center gap-1">
      <HoverCardPanel
        title="@nextjs"
        description="The React Framework - created and maintained by @vercel."
        metadata="Joined December 2021"
      />
      <SpecTrigger>Hover here</SpecTrigger>
    </div>
  )
}

function SidePlacementPreview({
  side,
  trigger,
  panel
}: {
  side: "top" | "right" | "bottom" | "left"
  trigger: React.ReactNode
  panel: React.ReactNode
}) {
  const isHorizontal = side === "left" || side === "right"

  return (
    <div
      className={cn(
        "flex gap-1",
        isHorizontal ? "flex-row items-center" : "flex-col items-center"
      )}
    >
      {side === "left" || side === "top" ? (
        <>
          {panel}
          {trigger}
        </>
      ) : (
        <>
          {trigger}
          {panel}
        </>
      )}
    </div>
  )
}

function SideTrigger({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center justify-center rounded-sm border border-border bg-background px-2.5 text-xs font-medium text-foreground">
      {children}
    </span>
  )
}

function SideHoverCardExample({
  side,
  label,
  description
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
  description: string
}) {
  return (
    <SidePlacementPreview
      side={side}
      trigger={<SideTrigger>{label}</SideTrigger>}
      panel={
        <HoverCardPanel className="w-64" title="Hover card" description={description} />
      }
    />
  )
}

function RtlSideExample({
  side,
  label
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
}) {
  const panel = (
    <HoverCardPanel
      dir="rtl"
      description="سماعات لاسلكية"
      metadata="$ ٩٩.٩٩"
      className="w-64"
    />
  )

  return (
    <SidePlacementPreview side={side} trigger={<SideTrigger>{label}</SideTrigger>} panel={panel} />
  )
}

export function HoverCardDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Hover Card</h1>
          <p className="text-base text-muted-foreground">
            For sighted users to preview content available behind a link.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/hover-card"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Hover Card">
          <VariantGrid className="flex-col sm:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <SpecHoverCard dir="ltr" />
                <SpecHoverCard dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Basic">
          <PreviewBox>
            <BasicHoverCardExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Sides">
          <PreviewBox>
            <div className="inline-grid grid-cols-[repeat(2,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] gap-12">
              <SideHoverCardExample
                side="left"
                label="Left"
                description="This hover card appears on the left side of the trigger."
              />
              <SideHoverCardExample
                side="top"
                label="Top"
                description="This hover card appears on the top side of the trigger."
              />
              <SideHoverCardExample
                side="bottom"
                label="Bottom"
                description="This hover card appears on the bottom side of the trigger."
              />
              <SideHoverCardExample
                side="right"
                label="Right"
                description="This hover card appears on the right side of the trigger."
              />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <div className="inline-grid grid-cols-[repeat(2,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] gap-12">
              <RtlSideExample side="right" label="يمين" />
              <RtlSideExample side="bottom" label="أسفل" />
              <RtlSideExample side="top" label="أعلى" />
              <RtlSideExample side="left" label="يسار" />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
