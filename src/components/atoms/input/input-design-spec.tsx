/**
 * Storybook-only layout mirroring the Figma Input documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { ButtonGroup, ButtonGroupText } from "@/components/atoms/button-group/button-group"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/atoms/field/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Input } from "./input"
import type { InputShape } from "./input.variants"

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

function MatrixRowLabels({ rows, rowHeight = "h-[88px]" }: { rows: string[]; rowHeight?: string }) {
  return (
    <div className="flex min-w-[110px] flex-col gap-0 pt-[4.5rem]">
      {rows.map((row) => (
        <div key={row} className={cn("flex items-center gap-2.5", rowHeight)}>
          <span className="w-[88px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className={cn("w-3 border-l border-foreground", rowHeight)} aria-hidden />
        </div>
      ))}
    </div>
  )
}

type SpecInputState = "default" | "focus" | "invalid" | "disabled"

function SpecInput({
  dir = "ltr",
  state = "default",
  shape = "default",
  placeholder = "Placeholder",
  defaultValue,
  className
}: {
  dir?: "ltr" | "rtl"
  state?: SpecInputState
  shape?: InputShape
  placeholder?: string
  defaultValue?: string
  className?: string
}) {
  const disabled = state === "disabled"
  const invalid = state === "invalid"
  const focused = state === "focus"

  return (
    <Input
      dir={dir}
      shape={shape}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      placeholder={defaultValue ? undefined : placeholder}
      defaultValue={defaultValue}
      className={cn(
        "w-[320px]",
        dir === "rtl" && "text-right",
        focused && !disabled && "border-ring ring-[3px] ring-ring/50",
        className
      )}
    />
  )
}

function SpecFieldLabel({
  dir = "ltr",
  state = "default"
}: {
  dir?: "ltr" | "rtl"
  state?: "default" | "invalid" | "disabled"
}) {
  const isRtl = dir === "rtl"
  const disabled = state === "disabled"
  const invalid = state === "invalid"

  return (
    <FieldLabel
      className={cn(
        "w-[145px]",
        invalid && "text-destructive",
        disabled && "opacity-50",
        isRtl && "justify-end text-right"
      )}
    >
      Field label
    </FieldLabel>
  )
}

function SpecFieldDescription({ align = "left" }: { align?: "left" | "right" }) {
  return (
    <FieldDescription className={cn(align === "right" && "text-right")}>
      Field description
    </FieldDescription>
  )
}

const INPUT_MATRIX_ROWS: { label: string; state: SpecInputState }[] = [
  { label: "Default", state: "default" },
  { label: "Focus/Active", state: "focus" },
  { label: "Destructive", state: "invalid" },
  { label: "Disabled", state: "disabled" }
]

function InputStateMatrix() {
  const shapes = [
    { key: "default", value: "default" as const },
    { key: "pill", value: "pill" as const }
  ]

  return (
    <VariantGrid>
      <div className="flex min-w-[900px] gap-4">
        <MatrixRowLabels rows={INPUT_MATRIX_ROWS.map((row) => row.label)} />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="grid grid-cols-2 gap-8">
            {(["ltr", "rtl"] as const).map((dir) => (
              <div key={dir} className="flex flex-col items-center gap-6">
                <span className="text-sm font-medium text-muted-foreground uppercase">{dir}</span>
                <div className="grid w-full grid-cols-2 gap-6">
                  {(["Placeholder", "Active"] as const).map((col) => (
                    <div key={col} className="flex flex-col items-center gap-6">
                      <span className="text-sm font-medium text-muted-foreground">{col}</span>
                      <div className="h-3 w-full border-b border-foreground" aria-hidden />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {INPUT_MATRIX_ROWS.flatMap(({ label, state }) =>
              shapes.map(({ key, value }) => (
                <div key={`${label}-${key}`} className="grid grid-cols-2 gap-8">
                  {(["ltr", "rtl"] as const).map((dir) => (
                    <div key={dir} className="grid grid-cols-2 gap-6">
                      <SpecInput dir={dir} state={state} shape={value} />
                      <SpecInput
                        dir={dir}
                        state={state}
                        shape={value}
                        defaultValue={dir === "rtl" ? "نص الإدخال" : "Active"}
                      />
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </VariantGrid>
  )
}

export function InputDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[940px] flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Input</h1>
          <p className="text-base text-muted-foreground">
            Displays a form input field or a component that looks like an input field.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/input" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Field elements">
          <h4 className="text-lg font-semibold text-foreground">Field label</h4>
          <VariantGrid className="mt-4 max-w-fit">
            <div className="flex gap-4">
              <MatrixRowLabels
                rows={["Default", "Destructive", "Disabled"]}
                rowHeight="h-[44px]"
              />
              <div className="flex flex-col gap-4 pt-14">
                <div className="grid grid-cols-2 gap-16">
                  <span className="text-center text-sm font-medium text-muted-foreground">LTR</span>
                  <span className="text-center text-sm font-medium text-muted-foreground">RTL</span>
                </div>
                <div className="grid grid-cols-2 gap-16">
                  <SpecFieldLabel dir="ltr" />
                  <SpecFieldLabel dir="rtl" />
                  <SpecFieldLabel dir="ltr" state="invalid" />
                  <SpecFieldLabel dir="rtl" state="invalid" />
                  <SpecFieldLabel dir="ltr" state="disabled" />
                  <SpecFieldLabel dir="rtl" state="disabled" />
                </div>
              </div>
            </div>
          </VariantGrid>

          <h4 className="pt-8 text-lg font-semibold text-foreground">Field description</h4>
          <VariantGrid className="mt-4 max-w-fit">
            <div className="grid grid-cols-2 gap-16 px-4 pt-2">
              <SpecFieldDescription align="left" />
              <SpecFieldDescription align="right" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Input">
          <InputStateMatrix />
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="Use Input for a single-line text field."
        >
          <PreviewBox>
            <Input className="w-[320px]" placeholder="Enter text" />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Default"
          description="Pair Input with FieldLabel and FieldDescription for accessible forms."
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2">
              <FieldLabel htmlFor="spec-default">Email</FieldLabel>
              <Input id="spec-default" type="email" placeholder="m@example.com" />
              <FieldDescription>Enter your email address.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Form"
          description="Compose multiple fields with actions."
        >
          <PreviewBox>
            <FieldGroup className="w-[320px] gap-5">
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-form-name">Name</FieldLabel>
                <Input id="spec-form-name" defaultValue="Evil Rabbit" />
              </Field>
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-form-email">Email</FieldLabel>
                <Input id="spec-form-email" type="email" defaultValue="evil@rabbit.com" />
                <FieldDescription>We&apos;ll never share your email.</FieldDescription>
              </Field>
              <div className="flex gap-2">
                <Button type="button">Submit</Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description="Use aria-invalid on the input and destructive styling on the label when validation fails."
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2" data-invalid>
              <FieldLabel htmlFor="spec-invalid" className="text-destructive">
                Email
              </FieldLabel>
              <Input id="spec-invalid" type="email" defaultValue="not-an-email" aria-invalid />
              <FieldDescription>Enter a valid email address.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disable the input to prevent edits."
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2 opacity-50" data-disabled>
              <FieldLabel htmlFor="spec-disabled">Email</FieldLabel>
              <Input id="spec-disabled" disabled defaultValue="m@example.com" />
              <FieldDescription>Contact support to change your email.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="File"
          description="Use type=&quot;file&quot; for file uploads."
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2">
              <FieldLabel htmlFor="spec-file">Picture</FieldLabel>
              <Input id="spec-file" type="file" />
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="With button"
          description="Place a button beside the input for inline actions."
        >
          <PreviewBox>
            <div className="flex w-[395px] max-w-full gap-2">
              <Input className="flex-1" placeholder="Email" type="email" />
              <Button type="button">Subscribe</Button>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Grid"
          description="Use a grid for related fields such as first and last name."
        >
          <PreviewBox>
            <div className="grid w-full max-w-sm grid-cols-2 gap-4">
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-first">First name</FieldLabel>
                <Input id="spec-first" defaultValue="Evil" />
              </Field>
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-last">Last name</FieldLabel>
                <Input id="spec-last" defaultValue="Rabbit" />
              </Field>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Input group"
          description="Use InputGroup for addons such as icons or text."
        >
          <PreviewBox>
            <Field className="w-[278px] gap-2">
              <FieldLabel htmlFor="spec-input-group">Search</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Search className="size-4" aria-hidden />
                </InputGroupAddon>
                <InputGroupInput id="spec-input-group" placeholder="Search..." />
              </InputGroup>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="With button group"
          description="Attach a ButtonGroup to the end of an input."
        >
          <PreviewBox>
            <Field className="w-[320px] gap-2">
              <FieldLabel htmlFor="spec-bg-input">Website</FieldLabel>
              <div className="flex w-full">
                <Input id="spec-bg-input" className="rounded-r-none" placeholder="https://" />
                <ButtonGroup className="shrink-0">
                  <ButtonGroupText className="rounded-l-none border border-l-0">
                    .com
                  </ButtonGroupText>
                </ButtonGroup>
              </div>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Form (extended)"
          description="A larger form layout combining grid fields and actions."
        >
          <PreviewBox>
            <FieldGroup className="w-full max-w-sm gap-5">
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-ext-name">Name</FieldLabel>
                <Input id="spec-ext-name" defaultValue="Evil Rabbit" />
              </Field>
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-ext-email">Email</FieldLabel>
                <Input id="spec-ext-email" type="email" placeholder="john@example.com" />
                <FieldDescription>
                  We&apos;ll never share your email with anyone.
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field className="gap-2">
                  <FieldLabel htmlFor="spec-ext-phone">Phone</FieldLabel>
                  <Input id="spec-ext-phone" type="tel" defaultValue="+1 (555) 000-0000" />
                </Field>
                <Field className="gap-2">
                  <FieldLabel htmlFor="spec-ext-country">Country</FieldLabel>
                  <Button
                    id="spec-ext-country"
                    type="button"
                    variant="outline"
                    className="h-8 w-full justify-between px-2.5 font-medium shadow-xs"
                  >
                    United States
                    <ChevronDown className="size-4 opacity-50" aria-hidden />
                  </Button>
                </Field>
              </div>
              <Field className="gap-2">
                <FieldLabel htmlFor="spec-ext-bio">Bio</FieldLabel>
                <Input id="spec-ext-bio" defaultValue="Designer" />
              </Field>
              <div className="flex gap-2">
                <Button type="button">Save</Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description="Set dir=&quot;rtl&quot; on inputs and fields for right-to-left layouts."
        >
          <PreviewBox>
            <FieldGroup dir="rtl" className="w-[320px] gap-2">
              <Field className="items-end gap-2">
                <FieldLabel htmlFor="spec-rtl-email" className="text-right">
                  البريد الإلكتروني
                </FieldLabel>
                <Input
                  id="spec-rtl-email"
                  dir="rtl"
                  className="text-right"
                  defaultValue="m@example.com"
                />
                <FieldDescription className="text-right">أدخل بريدك الإلكتروني.</FieldDescription>
              </Field>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
