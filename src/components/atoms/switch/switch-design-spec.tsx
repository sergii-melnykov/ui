/**
 * Storybook-only layout mirroring the Figma Switch documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/atoms/field/field"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Switch } from "./switch"

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
      {description ? (
        <p className="pt-4 text-base text-muted-foreground">{description}</p>
      ) : (
        <div className="pt-6" />
      )}
      <div className={description ? "pt-6" : undefined}>{children}</div>
    </div>
  )
}

function MatrixRowLabels({ rows, rowClassName }: { rows: string[]; rowClassName?: string }) {
  return (
    <div className="flex flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className={cn("flex items-center gap-2.5", rowClassName)}>
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full min-h-[70px] w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function MatrixColumnHeaders({ columns }: { columns: string[] }) {
  return (
    <div className={cn("grid gap-6", columns.length === 4 ? "grid-cols-4" : "grid-cols-2")}>
      {columns.map((label) => (
        <div key={label} className="flex flex-col items-center gap-6">
          <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

type ControlColumn = "Default" | "Focus" | "Disabled" | "Destructive"

function SpecSwitchControl({
  checked = false,
  column
}: {
  checked?: boolean
  column: ControlColumn
}) {
  const disabled = column === "Disabled"
  const destructive = column === "Destructive"
  const focused = column === "Focus"

  return (
    <Switch
      defaultChecked={checked}
      disabled={disabled}
      aria-invalid={destructive || undefined}
      className={cn(focused && !disabled && "border-ring ring-[3px] ring-ring/50")}
    />
  )
}

export function SwitchDesignSpec() {
  const controlColumns: ControlColumn[] = ["Default", "Focus", "Disabled", "Destructive"]

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Switch</h1>
          <p className="text-base text-muted-foreground">
            A control that allows the user to toggle between checked and not checked.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/switch" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Switch">
          <VariantGrid className="overflow-x-auto">
            <MatrixRowLabels rows={["Unchecked", "Checked"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <MatrixColumnHeaders columns={controlColumns} />
              <div className="grid grid-cols-4 gap-6">
                {[false, true].flatMap((checked) =>
                  controlColumns.map((column) => (
                    <div
                      key={`${column}-${checked ? "checked" : "unchecked"}`}
                      className="flex h-[70px] items-center justify-center"
                    >
                      <SpecSwitchControl checked={checked} column={column} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Description">
          <PreviewBox>
            <div className="flex w-full max-w-[384px] items-start gap-2">
              <FieldContent className="min-w-0 flex-1 gap-0.5">
                <p className="text-sm font-medium text-foreground">Share across devices</p>
                <FieldDescription>
                  Focus is shared across devices, and turns off when you leave the app.
                </FieldDescription>
              </FieldContent>
              <Switch className="shrink-0" aria-label="Share across devices" />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Choice Card"
          description={
            <>
              Card-style selection where <code>FieldLabel</code> wraps the entire{" "}
              <code>Field</code> for a clickable card pattern.
            </>
          }
        >
          <PreviewBox>
            <FieldGroup className="w-full max-w-[404px] gap-5">
              <div className="flex gap-2 rounded-lg border border-border p-2.5">
                <FieldContent className="min-w-0 flex-1 gap-0.5">
                  <p className="text-sm font-medium text-foreground">Share across devices</p>
                  <FieldDescription>
                    Focus is shared across devices, and turns off when you leave the app.
                  </FieldDescription>
                </FieldContent>
                <Switch className="shrink-0" aria-label="Share across devices" />
              </div>
              <div className="flex gap-2 rounded-lg border border-primary bg-accent p-2.5">
                <FieldContent className="min-w-0 flex-1 gap-0.5">
                  <p className="text-sm font-medium text-foreground">Enable notifications</p>
                  <FieldDescription>
                    Receive notifications when focus mode is enabled or disabled.
                  </FieldDescription>
                </FieldContent>
                <Switch defaultChecked className="shrink-0" aria-label="Enable notifications" />
              </div>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description={
            <>
              Add the <code>disabled</code> prop to the <code>Switch</code> component to disable the
              switch. Add the <code>data-disabled</code> prop to the <code>Field</code> component
              for styling.
            </>
          }
        >
          <PreviewBox>
            <Field orientation="horizontal" className="gap-2 opacity-50" data-disabled>
              <Switch disabled aria-label="Disabled" />
              <FieldLabel className="font-medium">Disabled</FieldLabel>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description={
            <>
              Add the <code>aria-invalid</code> prop to the <code>Switch</code> component to
              indicate an invalid state. Add the <code>data-invalid</code> prop to the{" "}
              <code>Field</code> component for styling.
            </>
          }
        >
          <PreviewBox>
            <div className="flex w-full max-w-[384px] items-start gap-2" data-invalid>
              <FieldContent className="min-w-0 flex-1 gap-0.5">
                <p className="text-sm font-medium text-destructive">Accept terms and conditions</p>
                <FieldDescription>
                  You must accept the terms and conditions to continue.
                </FieldDescription>
              </FieldContent>
              <Switch aria-invalid className="shrink-0" aria-label="Accept terms and conditions" />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description={
            <>
              Add the <code>size</code> prop to the <code>Switch</code> component to change the
              control size.
            </>
          }
        >
          <PreviewBox>
            <FieldGroup className="gap-5">
              <Field orientation="horizontal" className="gap-2">
                <Switch size="sm" aria-label="Small" />
                <FieldLabel>Small</FieldLabel>
              </Field>
              <Field orientation="horizontal" className="gap-2">
                <Switch aria-label="Default" />
                <FieldLabel>Default</FieldLabel>
              </Field>
            </FieldGroup>
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
            <div className="flex w-full max-w-[384px] items-start gap-2">
              <Switch className="shrink-0" aria-label="المشاركة عبر الأجهزة" />
              <FieldContent className="min-w-0 flex-1 gap-0.5 text-right">
                <p className="text-sm font-medium text-foreground">المشاركة عبر الأجهزة</p>
                <FieldDescription dir="rtl">
                  يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.
                </FieldDescription>
              </FieldContent>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
