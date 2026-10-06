/**
 * Storybook-only layout mirroring the Figma Tooltip documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, Save } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Kbd } from "@/components/atoms/kbd/kbd"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/atoms/tooltip/tooltip"
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

function PlacementColumn({
  label,
  side
}: {
  label: string
  side: "top" | "right" | "bottom" | "left"
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <OpenTooltip side={side} content="Tooltip">
        <span
          className="inline-block h-3 w-full rounded-lg border-b border-foreground"
          aria-hidden
        />
      </OpenTooltip>
    </div>
  )
}

function OpenTooltip({
  side,
  content,
  children
}: {
  side: "top" | "right" | "bottom" | "left"
  content: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={8}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

function SideExample({
  side,
  label
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
}) {
  return (
    <OpenTooltip side={side} content="Add to library">
      <Button variant="outline" size="sm">
        {label}
      </Button>
    </OpenTooltip>
  )
}

function RtlSideExample({
  side,
  label
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
}) {
  return (
    <OpenTooltip side={side} content="إضافة إلى المكتبة">
      <Button variant="outline" size="sm">
        {label}
      </Button>
    </OpenTooltip>
  )
}

export function TooltipDesignSpec() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold leading-9 text-foreground">Tooltip</h1>
            <p className="text-base text-muted-foreground">
              A popup that displays information related to an element when the element receives
              keyboard focus or the mouse hovers over it.
            </p>
          </div>
          <Button variant="outline" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
            <a href="https://ui.shadcn.com/docs/components/tooltip" target="_blank" rel="noreferrer">
              View in Shadcn
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </header>

        <div className="flex flex-col gap-10">
          <h2 className="text-2xl font-semibold text-foreground">Components</h2>

          <SpecSection title="Tooltip">
            <VariantGrid>
              <div className="flex w-full flex-col gap-4">
                <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
                  <PlacementColumn label="Top" side="top" />
                  <PlacementColumn label="Bottom" side="bottom" />
                  <PlacementColumn label="Left" side="left" />
                  <PlacementColumn label="Right" side="right" />
                </div>
              </div>
            </VariantGrid>
          </SpecSection>
        </div>

        <Separator />

        <div className="flex flex-col gap-10">
          <h2 className="text-xl font-semibold text-foreground">Examples</h2>

          <ExampleBlock
            title="Side"
            description="Use the side prop to change the position of the tooltip."
          >
            <PreviewBox>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <SideExample side="left" label="Left" />
                <SideExample side="top" label="Top" />
                <SideExample side="bottom" label="Bottom" />
                <SideExample side="right" label="Right" />
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock title="With Keyboard Shortcut">
            <PreviewBox>
              <div className="flex flex-col items-center gap-2">
                <OpenTooltip
                  side="top"
                  content={
                    <span className="inline-flex items-center gap-2">
                      Save changes
                      <Kbd>S</Kbd>
                    </span>
                  }
                >
                  <Button variant="outline" size="icon" aria-label="Save">
                    <Save className="size-4" />
                  </Button>
                </OpenTooltip>
              </div>
            </PreviewBox>
          </ExampleBlock>

          <ExampleBlock
            title="Disabled Button"
            description="Show a tooltip on a disabled button by wrapping it with a span."
          >
            <PreviewBox>
              <OpenTooltip side="top" content="This feature is currently unavailable">
                <span className="inline-flex">
                  <Button variant="outline" disabled>
                    Disabled
                  </Button>
                </span>
              </OpenTooltip>
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
              <div className="flex flex-wrap items-center justify-center gap-2">
                <RtlSideExample side="right" label="يمين" />
                <RtlSideExample side="bottom" label="أسفل" />
                <RtlSideExample side="top" label="أعلى" />
                <RtlSideExample side="left" label="يسار" />
              </div>
            </PreviewBox>
          </ExampleBlock>
        </div>
      </div>
    </TooltipProvider>
  )
}
