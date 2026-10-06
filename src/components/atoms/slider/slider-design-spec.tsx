/**
 * Storybook-only layout mirroring the Figma Slider documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldLabel } from "@/components/atoms/field/field"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Slider } from "./slider"

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
      <div className={cn(description ? "pt-6" : "pt-4")}>{children}</div>
    </div>
  )
}

function AnatomyColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
      <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">{label}</span>
      <div className="h-3 w-full border-b border-foreground" aria-hidden />
      <div className="flex w-full items-center justify-center py-2">{children}</div>
    </div>
  )
}

function SpecSliderThumb({ hover }: { hover?: boolean }) {
  return (
    <div
      className={cn(
        "size-3 shrink-0 rounded-full border border-ring bg-background shadow-sm",
        hover && "ring-[3px] ring-ring/50"
      )}
      aria-hidden
    />
  )
}

function SpecSliderTrack({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-full bg-muted",
        orientation === "horizontal" ? "h-1 w-[100px]" : "h-[160px] w-1"
      )}
      aria-hidden
    />
  )
}

function SpecSliderRange({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-full bg-primary",
        orientation === "horizontal" ? "h-1 w-[140px]" : "h-[80px] w-1"
      )}
      aria-hidden
    />
  )
}

function ControlledExample() {
  const [values, setValues] = React.useState([0.3, 0.7])

  return (
    <Field className="w-80 gap-3">
      <div className="flex w-full items-center gap-2">
        <FieldLabel className="flex-1 font-medium">Temperature</FieldLabel>
        <span className="text-sm text-muted-foreground">
          {values.map((value) => value.toFixed(1)).join(", ")}
        </span>
      </div>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={values}
        onValueChange={setValues}
        aria-label="Temperature"
      />
    </Field>
  )
}

const sliderWidthClass = "w-80"

export function SliderDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Slider</h1>
          <p className="text-base text-muted-foreground">
            An input where the user selects a value from within a given range.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/slider" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Slider Thumb">
          <VariantGrid className="w-full">
            <div className="flex w-full gap-6">
              <AnatomyColumn label="Default">
                <SpecSliderThumb />
              </AnatomyColumn>
              <AnatomyColumn label="Hover">
                <SpecSliderThumb hover />
              </AnatomyColumn>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Slider Range">
          <VariantGrid className="w-full">
            <div className="flex w-full gap-6">
              <AnatomyColumn label="Horizontal">
                <SpecSliderRange orientation="horizontal" />
              </AnatomyColumn>
              <AnatomyColumn label="Vertical">
                <SpecSliderRange orientation="vertical" />
              </AnatomyColumn>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Slider Track">
          <VariantGrid className="w-full">
            <div className="flex w-full gap-6">
              <AnatomyColumn label="Horizontal">
                <SpecSliderTrack orientation="horizontal" />
              </AnatomyColumn>
              <AnatomyColumn label="Vertical">
                <SpecSliderTrack orientation="vertical" />
              </AnatomyColumn>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Range"
          description="Use an array with two values for a range slider."
        >
          <PreviewBox>
            <Slider className={sliderWidthClass} defaultValue={[37, 62]} max={100} step={1} />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Multiple Thumbs"
          description="Use an array with multiple values for multiple thumbs."
        >
          <PreviewBox>
            <Slider className={sliderWidthClass} defaultValue={[8, 75, 100]} max={100} step={1} />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description='Use orientation="vertical" for a vertical slider.'
        >
          <PreviewBox>
            <div className="flex items-center gap-4">
              <Slider
                orientation="vertical"
                className="h-40"
                defaultValue={[50]}
                max={100}
                step={1}
                aria-label="Vertical slider"
              />
              <Slider
                orientation="vertical"
                className="h-40"
                defaultValue={[28]}
                max={100}
                step={1}
                aria-label="Vertical slider lower value"
              />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Controlled">
          <PreviewBox>
            <ControlledExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Disabled" description="Use the disabled prop to disable the slider.">
          <PreviewBox>
            <Slider
              className={sliderWidthClass}
              defaultValue={[48]}
              max={100}
              step={1}
              disabled
              aria-label="Disabled slider"
            />
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
                className="underline underline-offset-4"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <div dir="rtl" className={sliderWidthClass}>
              <Slider defaultValue={[25]} max={100} step={1} aria-label="RTL slider" />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
