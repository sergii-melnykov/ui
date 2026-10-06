/**
 * Storybook-only layout mirroring the Figma Label documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Checkbox } from "@/components/atoms/checkbox/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from "@/components/atoms/field/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import { Input } from "@/components/atoms/input/input"
import { Textarea } from "@/components/atoms/textarea/textarea"
import { cn } from "@/utils/index"

import { Label } from "./label"

function PreviewBox({
  children,
  fullWidth = false
}: {
  children: React.ReactNode
  fullWidth?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-border p-10",
        fullWidth ? "w-full" : "shrink-0 self-start"
      )}
    >
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
      {children}
    </div>
  )
}

function SelectTriggerLike({
  id,
  placeholder
}: {
  id: string
  placeholder?: string
}) {
  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        placeholder={placeholder}
        readOnly
        aria-readonly
        className="text-muted-foreground"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-hidden tabIndex={-1}>
          <ChevronDown className="size-4" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

function LabelInFieldPreview() {
  return (
    <FieldGroup className="w-[448px] gap-4">
      <FieldSet className="gap-4">
        <div className="flex flex-col gap-1.5 pb-0">
          <FieldLegend className="mb-0 text-base font-medium leading-6">Payment Method</FieldLegend>
          <FieldDescription>All transactions are secure and encrypted</FieldDescription>
        </div>
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel htmlFor="label-spec-name">Name on Card</FieldLabel>
            <Input id="label-spec-name" defaultValue="Evil Rabbit" readOnly />
          </Field>
          <Field>
            <FieldLabel htmlFor="label-spec-card">Card Number</FieldLabel>
            <Input id="label-spec-card" defaultValue="1234 5678 9012 3456" readOnly />
            <FieldDescription>Enter your 16-digit card number</FieldDescription>
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="label-spec-month">Month</FieldLabel>
              <SelectTriggerLike id="label-spec-month" placeholder="MM" />
            </Field>
            <Field>
              <FieldLabel htmlFor="label-spec-year">Year</FieldLabel>
              <SelectTriggerLike id="label-spec-year" placeholder="YYYY" />
            </Field>
            <Field>
              <FieldLabel htmlFor="label-spec-cvv">CVV</FieldLabel>
              <Input id="label-spec-cvv" defaultValue="123" readOnly />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet className="gap-4">
        <div className="flex flex-col gap-1.5">
          <FieldLegend className="mb-0 text-base font-medium leading-6">Billing Address</FieldLegend>
          <FieldDescription>The billing address associated with your payment method</FieldDescription>
        </div>
        <Field orientation="horizontal" className="gap-2">
          <Checkbox id="label-spec-billing-same" defaultChecked />
          <FieldLabel htmlFor="label-spec-billing-same" className="font-normal">
            Same as shipping address
          </FieldLabel>
        </Field>
      </FieldSet>

      <Field>
        <FieldLabel htmlFor="label-spec-comments">Comments</FieldLabel>
        <Textarea
          id="label-spec-comments"
          placeholder="Add any additional comments"
          className="min-h-16 resize-y"
          readOnly
        />
      </Field>

      <div className="flex gap-2">
        <Button type="button">Submit</Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </FieldGroup>
  )
}

export function LabelDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Label</h1>
          <p className="text-base leading-6 text-muted-foreground">
            Renders an accessible label associated with controls.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/label" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <section className="flex w-full flex-col">
        <h2 className="text-xl font-semibold leading-7 text-foreground">Examples</h2>
        <div className="flex flex-col items-center justify-center pt-6">
          <ExampleBlock
            title="Label in Field"
            description={
              <>
                For form fields, use the{" "}
                <a
                  href="https://ui.shadcn.com/docs/components/radix/field"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Field
                </a>{" "}
                component which includes built-in FieldLabel, FieldDescription, and FieldError
                components.
              </>
            }
          >
            <div className="pt-4">
              <PreviewBox>
                <LabelInFieldPreview />
              </PreviewBox>
            </div>
          </ExampleBlock>
        </div>
      </section>

      <section className="flex w-full flex-col">
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
          <div className="pt-4">
            <PreviewBox fullWidth>
              <div dir="rtl" className="flex w-[152px] items-center justify-end gap-2">
                <Label htmlFor="label-spec-rtl-terms" className="flex-1 text-right font-medium">
                  قبول الشروط والأحكام
                </Label>
                <Checkbox id="label-spec-rtl-terms" />
              </div>
            </PreviewBox>
          </div>
        </ExampleBlock>
      </section>
    </div>
  )
}
