/**
 * Storybook-only layout mirroring the Figma Progress documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldLabel } from "@/components/atoms/field/field"
import { Slider } from "@/components/atoms/slider/slider"

import { cn } from "@/utils/index"

import { Progress } from "./progress"

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

const previewWidthClass = "w-full max-w-sm"

function LabelExample() {
  const value = 66

  return (
    <Field className={cn(previewWidthClass, "gap-3")}>
      <div className="flex items-center gap-2">
        <FieldLabel className="flex-1 font-medium">Upload progress</FieldLabel>
        <span className="text-sm font-normal text-foreground">{value}%</span>
      </div>
      <Progress value={value} />
    </Field>
  )
}

function ControlledExample() {
  const [value, setValue] = React.useState(66)

  return (
    <div className={cn("flex flex-col gap-3", previewWidthClass)}>
      <Progress value={value} />
      <Slider
        value={[value]}
        onValueChange={(next) => {
          setValue(next[0] ?? 0)
        }}
        max={100}
        step={1}
        aria-label="Progress"
      />
    </div>
  )
}

function RtlExample() {
  return (
    <Field dir="rtl" className={cn(previewWidthClass, "gap-3")}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-normal text-foreground">%٦٦</span>
        <FieldLabel className="flex-1 justify-end text-right font-medium">تقدم الرفع</FieldLabel>
      </div>
      <Progress dir="rtl" value={66} />
    </Field>
  )
}

export function ProgressDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Progress</h1>
          <p className="text-base text-muted-foreground">
            Displays an indicator showing the completion progress of a task, typically displayed as
            a progress bar.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/progress" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Label"
          description="Use a Field component to add a label to the progress bar."
        >
          <PreviewBox>
            <LabelExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="A progress bar that can be controlled by a slider."
        >
          <PreviewBox>
            <ControlledExample />
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
            <RtlExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
