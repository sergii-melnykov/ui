/**
 * Storybook-only layout mirroring the Figma Checkbox documentation page.
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
  FieldLabel,
  FieldLegend,
  FieldSet
} from "@/components/atoms/field/field"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/atoms/table/table"
import { cn } from "@/utils/index"

import { Checkbox } from "./checkbox"

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

function MatrixRowLabels({
  rows,
  rowClassName,
  className
}: {
  rows: string[]
  rowClassName?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-6 pt-14", className)}>
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

type ControlColumn = "Default" | "Focus" | "Invalid" | "Disabled"

function SpecCheckboxControl({
  checked = false,
  column
}: {
  checked?: boolean
  column: ControlColumn
}) {
  const disabled = column === "Disabled"
  const invalid = column === "Invalid"
  const focused = column === "Focus"

  return (
    <Checkbox
      defaultChecked={checked}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(focused && !disabled && "border-ring ring-[3px] ring-ring/50")}
    />
  )
}

function SpecFieldCheckbox({
  dir = "ltr",
  state = "default",
  withDescription = true
}: {
  dir?: "ltr" | "rtl"
  state?: "default" | "disabled" | "invalid"
  withDescription?: boolean
}) {
  const id = React.useId()
  const disabled = state === "disabled"
  const invalid = state === "invalid"

  const isRtl = dir === "rtl"

  return (
    <div dir={dir} className={cn(isRtl && "flex w-full justify-end")}>
      <div
        className={cn(
          "flex w-full max-w-[400px] flex-col gap-0.5",
          isRtl && "items-end",
          disabled && "opacity-50"
        )}
      >
        <Field
          orientation="horizontal"
          className={cn("gap-2", isRtl && "flex-row-reverse justify-end")}
          data-disabled={disabled ? true : undefined}
          data-invalid={invalid ? true : undefined}
        >
          <Checkbox id={id} disabled={disabled} aria-invalid={invalid || undefined} />
          <FieldLabel
            htmlFor={id}
            className={cn(invalid && "text-destructive", isRtl && "justify-end text-right")}
          >
            Field label
          </FieldLabel>
        </Field>
        {withDescription ? (
          <div className={cn("flex w-full gap-2", isRtl && "flex-row-reverse justify-end")}>
            <span className="size-4 shrink-0" aria-hidden />
            <FieldDescription className={cn("flex-1", isRtl && "text-right")}>
              Field description
            </FieldDescription>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const TABLE_ROWS = [
  { name: "Sarah Chen", email: "sarah.chen@example.com", role: "Admin" },
  { name: "Marcus Rodriguez", email: "marcus.rodriguez@example.com", role: "User" },
  { name: "Priya Patel", email: "priya.patel@example.com", role: "User" },
  { name: "David Kim", email: "david.kim@example.com", role: "Editor" }
] as const

function CheckboxTableExample() {
  return (
    <Table className="max-w-[574px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-8 pl-2">
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TABLE_ROWS.map((row) => (
          <TableRow key={row.email}>
            <TableCell className="w-8 p-2">
              <Checkbox aria-label={`Select ${row.name}`} />
            </TableCell>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function RtlExamples() {
  return (
    <FieldGroup className="max-w-sm gap-5">
      <Field orientation="horizontal" className="flex-row-reverse gap-2">
        <Checkbox id="rtl-basic" />
        <FieldLabel htmlFor="rtl-basic" className="flex-1 justify-end text-right">
          قبول الشروط والأحكام
        </FieldLabel>
      </Field>
      <Field orientation="horizontal" className="flex-row-reverse gap-2">
        <Checkbox id="rtl-desc" defaultChecked />
        <FieldContent className="gap-0.5">
          <FieldLabel htmlFor="rtl-desc" className="justify-end text-right">
            قبول الشروط والأحكام
          </FieldLabel>
          <FieldDescription className="text-right">
            بالنقر على هذا المربع، فإنك توافق على الشروط.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" className="flex-row-reverse gap-2 opacity-50" data-disabled>
        <Checkbox id="rtl-disabled" disabled />
        <FieldLabel htmlFor="rtl-disabled" className="flex-1 justify-end text-right">
          تفعيل الإشعارات
        </FieldLabel>
      </Field>
      <div className="rounded-lg border border-border p-2.5">
        <Field orientation="horizontal" className="flex-row-reverse gap-2">
          <Checkbox id="rtl-bordered" />
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor="rtl-bordered" className="justify-end text-right">
              تفعيل الإشعارات
            </FieldLabel>
            <FieldDescription className="text-right">
              يمكنك تفعيل أو إلغاء تفعيل الإشعارات في أي وقت.
            </FieldDescription>
          </FieldContent>
        </Field>
      </div>
    </FieldGroup>
  )
}

export function CheckboxDesignSpec() {
  const controlColumns: ControlColumn[] = ["Default", "Focus", "Invalid", "Disabled"]

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Checkbox</h1>
          <p className="text-base text-muted-foreground">
            A control that allows the user to toggle between checked and not checked.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/checkbox" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Checkbox">
          <VariantGrid className="overflow-x-auto">
            <MatrixRowLabels rows={["Unchecked", "Checked"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <MatrixColumnHeaders columns={controlColumns} />
              <div className="grid grid-cols-4 gap-6">
                {controlColumns.flatMap((column) => [
                  <div key={`${column}-unchecked`} className="flex h-[70px] items-center justify-center">
                    <SpecCheckboxControl column={column} />
                  </div>,
                  <div key={`${column}-checked`} className="flex h-[70px] items-center justify-center">
                    <SpecCheckboxControl checked column={column} />
                  </div>
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Checkbox">
          <VariantGrid className="overflow-x-auto">
            <MatrixRowLabels
              rows={["Default", "Disabled", "Invalid"]}
              rowClassName="min-h-[42px] [&>div]:min-h-[42px]"
              className="pt-[72px]"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <MatrixColumnHeaders columns={["LTR", "RTL"]} />
              <div className="grid grid-cols-2 gap-6">
                <SpecFieldCheckbox dir="ltr" />
                <SpecFieldCheckbox dir="rtl" />
                <SpecFieldCheckbox dir="ltr" state="disabled" withDescription={false} />
                <SpecFieldCheckbox dir="rtl" state="disabled" withDescription={false} />
                <SpecFieldCheckbox dir="ltr" state="invalid" />
                <SpecFieldCheckbox dir="rtl" state="invalid" />
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
          description="Pair the checkbox with Field and FieldLabel for proper layout and labeling."
        >
          <PreviewBox>
            <Field orientation="horizontal" className="max-w-xs gap-2">
              <Checkbox id="spec-basic" />
              <FieldLabel htmlFor="spec-basic">Accept terms and conditions</FieldLabel>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Description"
          description="Use FieldContent and FieldDescription for helper text."
        >
          <PreviewBox>
            <Field orientation="horizontal" className="max-w-xs gap-2">
              <Checkbox id="spec-description" defaultChecked />
              <FieldContent className="gap-0.5">
                <FieldLabel htmlFor="spec-description">Accept terms and conditions</FieldLabel>
                <FieldDescription>
                  By clicking this checkbox, you agree to the terms and conditions.
                </FieldDescription>
              </FieldContent>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description={
            <>
              Use the disabled prop to prevent interaction and add the data-disabled attribute to the{" "}
              <code>Field</code> component for disabled styles.
            </>
          }
        >
          <PreviewBox>
            <Field orientation="horizontal" className="max-w-xs gap-2 opacity-50" data-disabled>
              <Checkbox id="spec-disabled" defaultChecked disabled />
              <FieldLabel htmlFor="spec-disabled">Enable notifications</FieldLabel>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Group" description="Use multiple fields to create a checkbox list.">
          <PreviewBox>
            <FieldGroup className="w-full max-w-xs gap-4">
              <FieldSet className="gap-4">
                <div className="flex flex-col gap-1.5">
                  <FieldLegend variant="label" className="mb-0 pb-1.5">
                    Show these items on the desktop:
                  </FieldLegend>
                  <FieldDescription>
                    Select the items you want to show on the desktop.
                  </FieldDescription>
                </div>
                <FieldGroup className="gap-3">
                  <Field orientation="horizontal" className="gap-2">
                    <Checkbox id="spec-hard-disks" defaultChecked />
                    <FieldLabel htmlFor="spec-hard-disks">Hard disks</FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="gap-2">
                    <Checkbox id="spec-external-disks" defaultChecked />
                    <FieldLabel htmlFor="spec-external-disks">External disks</FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="gap-2">
                    <Checkbox id="spec-cds" />
                    <FieldLabel htmlFor="spec-cds">CDs, DVDs, and iPods</FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="gap-2">
                    <Checkbox id="spec-servers" />
                    <FieldLabel htmlFor="spec-servers">Connected servers</FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Table" description="Use checkboxes in table rows for bulk selection.">
          <PreviewBox>
            <CheckboxTableExample />
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
            <div dir="rtl" className="w-full">
              <RtlExamples />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>

      <Separator />
    </div>
  )
}
