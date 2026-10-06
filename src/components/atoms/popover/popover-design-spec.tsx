/**
 * Storybook-only layout mirroring the Figma Popover documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/atoms/input/input"
import { Label } from "@/components/atoms/label/label"
import { Separator } from "@/components/atoms/separator/separator"
import { PopoverDescription, PopoverHeader, PopoverTitle } from "./popover"
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
      <h3 className="text-lg font-semibold tracking-normal text-foreground">{title}</h3>
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
      <div className="pt-6">{children}</div>
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
    <span className="inline-flex h-7 items-center justify-center rounded-sm border border-border bg-background px-2.5 text-xs font-medium text-foreground">
      {children}
    </span>
  )
}

function PopoverPanel({
  dir = "ltr",
  title,
  description,
  children,
  className
}: {
  dir?: "ltr" | "rtl"
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      dir={dir}
      className={cn(
        "flex w-72 flex-col gap-0.5 rounded-lg border bg-popover p-2.5 text-popover-foreground shadow-md",
        dir === "rtl" && "items-end text-right",
        children && "gap-2.5",
        className
      )}
    >
      {title || description ? (
        <PopoverHeader className="w-full">
          {title ? <PopoverTitle>{title}</PopoverTitle> : null}
          {description ? <PopoverDescription>{description}</PopoverDescription> : null}
        </PopoverHeader>
      ) : null}
      {children}
    </div>
  )
}

function PopoverHeaderExample({ dir }: { dir: "ltr" | "rtl" }) {
  return (
    <PopoverPanel
      dir={dir}
      title="Dimensions"
      description="Set the dimensions for the layer."
    />
  )
}

function AlignExample({
  align,
  triggerLabel,
  panelLabel
}: {
  align: "start" | "center" | "end"
  triggerLabel: string
  panelLabel: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end"
      )}
    >
      <SpecTrigger>{triggerLabel}</SpecTrigger>
      <PopoverPanel className="w-40">
        <p className="text-sm text-popover-foreground">{panelLabel}</p>
      </PopoverPanel>
    </div>
  )
}

function WithFormExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <SpecTrigger>Open Popover</SpecTrigger>
      <PopoverPanel title="Dimensions" description="Set the dimensions for the layer." className="w-64">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="popover-spec-width" className="shrink-0">
              Width
            </Label>
            <Input id="popover-spec-width" defaultValue="100%" className="h-8 flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="popover-spec-height" className="shrink-0">
              Height
            </Label>
            <Input id="popover-spec-height" defaultValue="25px" className="h-8 flex-1" />
          </div>
        </div>
      </PopoverPanel>
    </div>
  )
}

function RtlSideExample({
  side,
  label
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
}) {
  const isHorizontal = side === "left" || side === "right"
  const panel = (
    <PopoverPanel
      dir="rtl"
      title="الأبعاد"
      description="تعيين الأبعاد للطبقة."
      className="w-40"
    />
  )
  const trigger = <SpecTrigger>{label}</SpecTrigger>

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

export function PopoverDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Popover</h1>
          <p className="text-base text-muted-foreground">
            Displays rich content in a portal, triggered by a button.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/popover" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Popover Header">
          <VariantGrid className="flex-col sm:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <PopoverHeaderExample dir="ltr" />
                <PopoverHeaderExample dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A simple popover with a header, title, and description."
        >
          <PreviewBox>
            <PopoverPanel title="Dimensions" description="Set the dimensions for the layer." />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Align"
          description="Use the align prop on PopoverContent to control the horizontal alignment."
        >
          <PreviewBox>
            <div className="flex flex-wrap justify-center gap-4">
              <AlignExample align="start" triggerLabel="Start" panelLabel="Aligned to start" />
              <AlignExample align="center" triggerLabel="Center" panelLabel="Aligned to center" />
              <AlignExample align="end" triggerLabel="End" panelLabel="Aligned to end" />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="With Form" description="A popover with form fields inside.">
          <PreviewBox>
            <WithFormExample />
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
            <div className="flex flex-wrap justify-center gap-4">
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
