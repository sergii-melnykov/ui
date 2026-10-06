/**
 * Storybook-only layout mirroring the Figma Radio Group documentation page.
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
  FieldSet,
  FieldTitle
} from "@/components/atoms/field/field"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { RadioGroup, RadioGroupItem } from "./radio-group"

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

function MatrixRowLabels({ rows, rowClassName }: { rows: string[]; rowClassName?: string }) {
  return (
    <div className="flex flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className={cn("flex items-center gap-2.5", rowClassName)}>
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full min-h-[32px] w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function MatrixColumnHeaders({ columns }: { columns: string[] }) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columns.length === 5 ? "grid-cols-5" : columns.length === 4 ? "grid-cols-4" : "grid-cols-2"
      )}
    >
      {columns.map((label) => (
        <div key={label} className="flex flex-col items-center gap-6">
          <span className="text-center text-sm font-medium whitespace-nowrap text-muted-foreground">
            {label}
          </span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

type ControlColumn = "Default" | "Focus" | "Disabled" | "Error" | "Error dis."

function SpecRadioControl({
  checked = false,
  column
}: {
  checked?: boolean
  column: ControlColumn
}) {
  const disabled = column === "Disabled" || column === "Error dis."
  const invalid = column === "Error" || column === "Error dis."
  const focused = column === "Focus"
  const value = checked ? "on" : "off"

  return (
    <RadioGroup defaultValue={checked ? "on" : undefined} className="contents">
      <RadioGroupItem
        value={value}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(focused && !disabled && "border-ring ring-[3px] ring-ring/50")}
      />
    </RadioGroup>
  )
}

function SpecFieldRadio({
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
    <RadioGroup defaultValue="on" className="contents">
      <div
        dir={dir}
        className={cn(
          "flex w-full max-w-[264px] flex-col gap-0.5",
          isRtl && "items-end",
          disabled && "opacity-50"
        )}
      >
        <div className={cn("flex w-full items-center gap-2", isRtl && "flex-row-reverse")}>
          <RadioGroupItem
            value="on"
            id={id}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            className="shrink-0"
          />
          <FieldLabel
            htmlFor={id}
            className={cn(
              "flex-1 font-medium",
              invalid && "text-destructive",
              isRtl && "justify-end text-right"
            )}
          >
            Field label
          </FieldLabel>
        </div>
        {withDescription ? (
          <div className={cn("flex w-full items-center gap-2", isRtl && "flex-row-reverse")}>
            <span className="size-4 shrink-0" aria-hidden />
            <FieldDescription className={cn("flex-1", isRtl && "text-right")}>
              Field description
            </FieldDescription>
          </div>
        ) : null}
      </div>
    </RadioGroup>
  )
}

function RadioOptionWithDescription({
  id,
  value,
  label,
  description,
  dir = "ltr"
}: {
  id: string
  value: string
  label: string
  description: string
  dir?: "ltr" | "rtl"
}) {
  const isRtl = dir === "rtl"

  return (
    <div
      className={cn("flex w-full max-w-[264px] flex-col gap-0.5", isRtl && "items-end")}
      dir={dir}
    >
      <div className={cn("flex w-full items-center gap-2", isRtl && "flex-row-reverse")}>
        <RadioGroupItem value={value} id={id} className="shrink-0" />
        <FieldLabel
          htmlFor={id}
          className={cn("flex-1 font-medium", isRtl && "justify-end text-right")}
        >
          {label}
        </FieldLabel>
      </div>
      <div className={cn("flex w-full items-center gap-2", isRtl && "flex-row-reverse")}>
        <span className="size-4 shrink-0" aria-hidden />
        <FieldDescription className={cn("flex-1", isRtl && "text-right")}>
          {description}
        </FieldDescription>
      </div>
    </div>
  )
}

function DescriptionOptionsExample() {
  const options = [
    { value: "default", label: "Default", description: "Standard spacing for most use cases." },
    { value: "comfortable", label: "Comfortable", description: "More space between elements." },
    { value: "compact", label: "Compact", description: "Minimal spacing for dense layouts." }
  ] as const

  return (
    <RadioGroup defaultValue="default" className="w-full max-w-xs gap-2">
      {options.map((option) => (
        <RadioOptionWithDescription
          key={option.value}
          id={`spec-spacing-${option.value}`}
          value={option.value}
          label={option.label}
          description={option.description}
        />
      ))}
    </RadioGroup>
  )
}

const choiceCardFieldLabelClassName =
  "has-data-[state=checked]:bg-accent has-[>[data-slot=field]]:rounded-lg [&>*]:data-[slot=field]:gap-2 [&>*]:data-[slot=field]:p-2.5"

function ChoiceCardExample() {
  return (
    <RadioGroup defaultValue="plus" className="w-full max-w-sm gap-5">
      {[
        {
          value: "plus",
          id: "spec-plus",
          title: "Plus",
          description: "For individuals and small teams."
        },
        {
          value: "pro",
          id: "spec-pro",
          title: "Pro",
          description: "For growing businesses."
        },
        {
          value: "enterprise",
          id: "spec-enterprise",
          title: "Enterprise",
          description: "For large teams and enterprises."
        }
      ].map((plan) => (
        <FieldLabel key={plan.value} htmlFor={plan.id} className={choiceCardFieldLabelClassName}>
          <Field orientation="horizontal" className="items-start">
            <FieldContent className="gap-0.5">
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={plan.value} id={plan.id} className="mt-0.5 shrink-0" />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}

function RtlExamples() {
  const options = [
    { value: "default", label: "افتراضي", description: "تباعد قياسي لمعظم حالات الاستخدام." },
    { value: "comfortable", label: "مريح", description: "مساحة أكبر بين العناصر." },
    { value: "compact", label: "مضغوط", description: "تباعد أدنى للتخطيطات الكثيفة." }
  ] as const

  return (
    <RadioGroup defaultValue="default" className="w-full max-w-xs gap-3">
      {options.map((option) => (
        <RadioOptionWithDescription
          key={option.value}
          id={`spec-rtl-${option.value}`}
          value={option.value}
          label={option.label}
          description={option.description}
          dir="rtl"
        />
      ))}
    </RadioGroup>
  )
}

export function RadioGroupDesignSpec() {
  const controlColumns: ControlColumn[] = [
    "Default",
    "Focus",
    "Disabled",
    "Error",
    "Error dis."
  ]

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Radio Group</h1>
          <p className="text-base text-muted-foreground">
            A set of checkable buttons—known as radio buttons—where no more than one of the buttons
            can be checked at a time.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radio-group"
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

        <SpecSection title="Radio">
          <VariantGrid className="overflow-x-auto">
            <MatrixRowLabels rows={["Unchecked", "Checked"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <MatrixColumnHeaders columns={controlColumns} />
              <div className="grid grid-cols-5 gap-6">
                {controlColumns.flatMap((column) => [
                  <div
                    key={`${column}-unchecked`}
                    className="flex h-8 items-center justify-center"
                  >
                    <SpecRadioControl column={column} />
                  </div>,
                  <div key={`${column}-checked`} className="flex h-8 items-center justify-center">
                    <SpecRadioControl checked column={column} />
                  </div>
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Radio Group">
          <VariantGrid className="overflow-x-auto">
            <MatrixRowLabels
              rows={["Default", "Invalid", "Disabled"]}
              rowClassName="min-h-[42px] [&>div]:min-h-[42px]"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <MatrixColumnHeaders columns={["LTR", "RTL"]} />
              <div className="grid grid-cols-2 gap-6">
                <SpecFieldRadio dir="ltr" />
                <SpecFieldRadio dir="rtl" />
                <SpecFieldRadio dir="ltr" state="invalid" />
                <SpecFieldRadio dir="rtl" state="invalid" />
                <SpecFieldRadio dir="ltr" state="disabled" withDescription={false} />
                <SpecFieldRadio dir="rtl" state="disabled" withDescription={false} />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Description"
          description="Radio group items with a description using the Field component."
        >
          <PreviewBox>
            <DescriptionOptionsExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Choice Card"
          description="Use FieldLabel to wrap the entire Field for a clickable card-style selection."
        >
          <PreviewBox>
            <ChoiceCardExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Fieldset"
          description="Use FieldSet and FieldLegend to group radio items with a label and description."
        >
          <PreviewBox>
            <FieldGroup className="w-full max-w-xs">
              <FieldSet>
                <FieldLegend variant="label">Subscription Plan</FieldLegend>
                <FieldDescription>
                  Yearly and lifetime plans offer significant savings.
                </FieldDescription>
                <RadioGroup defaultValue="monthly" className="gap-3">
                  {[
                    { id: "spec-plan-monthly", value: "monthly", label: "Monthly ($9.99/month)" },
                    { id: "spec-plan-yearly", value: "yearly", label: "Yearly ($99.99/year)" },
                    {
                      id: "spec-plan-lifetime",
                      value: "lifetime",
                      label: "Lifetime ($299.99)"
                    }
                  ].map((plan) => (
                    <Field key={plan.id} orientation="horizontal" className="gap-2">
                      <RadioGroupItem value={plan.value} id={plan.id} />
                      <FieldLabel htmlFor={plan.id} className="font-normal">
                        {plan.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Use the disabled prop on RadioGroupItem to disable individual items."
        >
          <PreviewBox>
            <RadioGroup defaultValue="option-1" className="gap-3">
              <Field orientation="horizontal" className="gap-2 opacity-50" data-disabled>
                <RadioGroupItem value="disabled" id="spec-disabled-item" disabled />
                <FieldLabel htmlFor="spec-disabled-item" className="font-normal">
                  Disabled
                </FieldLabel>
              </Field>
              <Field orientation="horizontal" className="gap-2">
                <RadioGroupItem value="option-1" id="spec-enabled-1" />
                <FieldLabel htmlFor="spec-enabled-1" className="font-normal">
                  Option 1
                </FieldLabel>
              </Field>
              <Field orientation="horizontal" className="gap-2">
                <RadioGroupItem value="option-2" id="spec-enabled-2" />
                <FieldLabel htmlFor="spec-enabled-2" className="font-normal">
                  Option 2
                </FieldLabel>
              </Field>
            </RadioGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description={
            <>
              Use <code>aria-invalid</code> on <code>RadioGroupItem</code> and{" "}
              <code>data-invalid</code> on <code>Field</code> to show validation errors.
            </>
          }
        >
          <PreviewBox>
            <FieldGroup className="w-full max-w-xs">
              <FieldSet>
                <FieldLegend variant="label">Notification Preferences</FieldLegend>
                <FieldDescription>Choose how you want to receive notifications.</FieldDescription>
                <RadioGroup defaultValue="email" className="gap-3">
                  {[
                    { id: "spec-notify-email", value: "email", label: "Email only" },
                    { id: "spec-notify-sms", value: "sms", label: "SMS only" },
                    { id: "spec-notify-both", value: "both", label: "Both Email & SMS" }
                  ].map((item) => (
                    <Field
                      key={item.id}
                      orientation="horizontal"
                      className="gap-2"
                      data-invalid={true}
                    >
                      <RadioGroupItem value={item.value} id={item.id} aria-invalid />
                      <FieldLabel htmlFor={item.id} className="font-normal text-destructive">
                        {item.label}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
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
