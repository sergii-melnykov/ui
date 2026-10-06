/**
 * Storybook-only layout mirroring the Figma Textarea documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldDescription, FieldLabel } from "@/components/atoms/field/field"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Textarea } from "./textarea"

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
      className={cn("overflow-x-auto rounded-xl border border-dashed border-border p-5", className)}
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

function MatrixRowLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex flex-col gap-6 pt-[58px]">
      {rows.map((row) => (
        <div key={row} className="flex h-16 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-16 w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

type SpecTextareaState = "default" | "focus" | "invalid" | "disabled"

function SpecTextarea({
  dir = "ltr",
  state = "default",
  placeholder = "Textarea",
  className
}: {
  dir?: "ltr" | "rtl"
  state?: SpecTextareaState
  placeholder?: string
  className?: string
}) {
  const disabled = state === "disabled"
  const invalid = state === "invalid"
  const focused = state === "focus"

  return (
    <Textarea
      dir={dir}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      placeholder={placeholder}
      className={cn(
        "w-[360px]",
        dir === "rtl" && "text-right",
        focused && !disabled && "border-ring ring-[3px] ring-ring/50",
        className
      )}
    />
  )
}

const TEXTAREA_MATRIX_ROWS: { label: string; state: SpecTextareaState }[] = [
  { label: "Default", state: "default" },
  { label: "Focus", state: "focus" },
  { label: "Destructive", state: "invalid" },
  { label: "Disabled", state: "disabled" }
]

function TextareaStateMatrix() {
  return (
    <VariantGrid>
      <div className="flex min-w-[820px] gap-4">
        <MatrixRowLabels rows={TEXTAREA_MATRIX_ROWS.map((row) => row.label)} />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="grid grid-cols-2 gap-6">
            {(["ltr", "rtl"] as const).map((dir) => (
              <div key={dir} className="flex flex-col items-center gap-2.5">
                <span className="text-sm font-medium text-muted-foreground">
                  {dir.toUpperCase()}
                </span>
                <div className="h-3 w-full border-b border-foreground" aria-hidden />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {TEXTAREA_MATRIX_ROWS.map(({ label, state }) => (
              <div key={label} className="grid grid-cols-2 gap-6">
                <SpecTextarea dir="ltr" state={state} />
                <SpecTextarea dir="rtl" state={state} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </VariantGrid>
  )
}

export function TextareaDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Textarea</h1>
          <p className="text-base text-muted-foreground">
            Displays a form textarea or a component that looks like a textarea.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/textarea" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Textarea">
          <TextareaStateMatrix />
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Field"
          description={
            <>
              Use <span className="font-medium text-foreground">Field</span>,{" "}
              <span className="font-medium text-foreground">FieldLabel</span>, and{" "}
              <span className="font-medium text-foreground">FieldDescription</span> to create a
              textarea with a label and description.
            </>
          }
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2">
              <FieldLabel htmlFor="spec-field-message">Message</FieldLabel>
              <FieldDescription>Enter your message below.</FieldDescription>
              <Textarea id="spec-field-message" placeholder="Type your message here." />
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description={
            <>
              Use the <span className="font-medium text-foreground">disabled</span> prop to disable
              the textarea. To style the disabled state, add the{" "}
              <span className="font-medium text-foreground">data-disabled</span> attribute to the{" "}
              <span className="font-medium text-foreground">Field</span> component.
            </>
          }
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2 opacity-50" data-disabled={true}>
              <FieldLabel htmlFor="spec-disabled-message">Message</FieldLabel>
              <Textarea id="spec-disabled-message" disabled placeholder="Type your message here." />
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description={
            <>
              Use the <span className="font-medium text-foreground">aria-invalid</span> prop to mark
              the input as invalid. To style the invalid state, add the{" "}
              <span className="font-medium text-foreground">data-invalid</span> attribute to the{" "}
              <span className="font-medium text-foreground">Field</span> component.
            </>
          }
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2" data-invalid={true}>
              <FieldLabel htmlFor="spec-invalid-message" className="text-destructive">
                Message
              </FieldLabel>
              <Textarea
                id="spec-invalid-message"
                aria-invalid
                placeholder="Type your message here."
              />
              <FieldDescription>Please enter a valid message.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Button"
          description={
            <>
              Pair with <span className="font-medium text-foreground">Button</span> to create a
              textarea with a submit button.
            </>
          }
        >
          <PreviewBox>
            <div className="flex w-[320px] flex-col gap-2">
              <Textarea placeholder="Type your message here." />
              <Button type="button" className="w-full">
                Send message
              </Button>
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
            <Field dir="rtl" className="w-[320px] items-end gap-2">
              <FieldLabel htmlFor="spec-rtl-feedback" className="text-right">
                التعليقات
              </FieldLabel>
              <Textarea
                id="spec-rtl-feedback"
                dir="rtl"
                className="text-right"
                placeholder="تعليقاتك تساعدنا على التحسين..."
              />
              <FieldDescription className="text-right">شاركنا أفكارك حول خدمتنا.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
