/**
 * Storybook-only layout mirroring the Figma Field documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Checkbox } from "@/components/atoms/checkbox/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import { Input } from "@/components/atoms/input/input"
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group/radio-group"
import { Slider } from "@/components/atoms/slider/slider"
import { Switch } from "@/components/atoms/switch/switch"
import { Textarea } from "@/components/atoms/textarea/textarea"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from "./field"

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

function RtlPaymentForm() {
  return (
    <FieldGroup className="w-full max-w-md gap-5">
      <FieldSet>
        <FieldLegend>طريقة الدفع</FieldLegend>
        <FieldDescription className="text-right">جميع المعاملات آمنة ومشفرة</FieldDescription>
        <FieldGroup className="gap-5">
          <Field className="items-end">
            <FieldLabel className="text-right">الاسم على البطاقة</FieldLabel>
            <Input defaultValue="Evil Rabbit" className="text-right" dir="rtl" />
          </Field>
          <Field className="items-end">
            <FieldLabel className="text-right">رقم البطاقة</FieldLabel>
            <Input defaultValue="1234 5678 9012 3456" className="text-right" dir="rtl" />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field className="items-end">
              <FieldLabel className="text-right">CVV</FieldLabel>
              <Input defaultValue="123" className="text-right" dir="rtl" />
            </Field>
            <Field className="items-end">
              <FieldLabel className="text-right">Month</FieldLabel>
              <InputGroup dir="rtl">
                <InputGroupAddon align="inline-start">
                  <InputGroupButton size="icon-xs" aria-hidden tabIndex={-1}>
                    <ChevronDown className="size-3" />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupInput defaultValue="2025" className="text-right" readOnly />
              </InputGroup>
            </Field>
            <Field className="items-end">
              <FieldLabel className="text-right">Year</FieldLabel>
              <InputGroup dir="rtl">
                <InputGroupAddon align="inline-start">
                  <InputGroupButton size="icon-xs" aria-hidden tabIndex={-1}>
                    <ChevronDown className="size-3" />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupInput defaultValue="٠٢" className="text-right" readOnly />
              </InputGroup>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>عنوان الفوترة</FieldLegend>
        <FieldDescription className="text-right">
          عنوان الفوترة المرتبط بطريقة الدفع الخاصة بك
        </FieldDescription>
        <Field orientation="horizontal" className="flex-row-reverse justify-end gap-2">
          <Checkbox id="rtl-billing-same" defaultChecked />
          <FieldLabel htmlFor="rtl-billing-same" className="text-right">
            نفس عنوان الشحن
          </FieldLabel>
        </Field>
      </FieldSet>

      <Field className="items-end">
        <FieldLabel className="text-right">تعليقات</FieldLabel>
        <Textarea
          placeholder="أضف أي تعليقات إضافية"
          className="min-h-16 text-right"
          dir="rtl"
          readOnly
        />
      </Field>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="button">إرسال</Button>
      </div>
    </FieldGroup>
  )
}

export function FieldDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Field</h1>
          <p className="text-base text-muted-foreground">
            Combine labels, controls, and help text to compose accessible form fields and grouped
            inputs.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/field" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Input">
          <PreviewBox>
            <FieldGroup className="w-full max-w-xs gap-5">
              <Field>
                <FieldLabel htmlFor="spec-username">Username</FieldLabel>
                <Input id="spec-username" defaultValue="Max Leiter" />
                <FieldDescription>Choose a unique username for your account.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="spec-password">Password</FieldLabel>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                <Input id="spec-password" type="password" defaultValue="password" />
              </Field>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Textarea">
          <PreviewBox>
            <Field className="w-full max-w-xs">
              <FieldLabel htmlFor="spec-feedback">Feedback</FieldLabel>
              <Textarea
                id="spec-feedback"
                placeholder="Your feedback helps us improve..."
                className="min-h-16"
                readOnly
              />
              <FieldDescription>Share your thoughts about our service.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Select">
          <PreviewBox>
            <Field className="w-full max-w-xs">
              <FieldLabel htmlFor="spec-department">Department</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="spec-department"
                  placeholder="Choose department"
                  readOnly
                  aria-readonly
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" aria-hidden tabIndex={-1}>
                    <ChevronDown className="size-3" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>Select your department or area of work.</FieldDescription>
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Slider">
          <PreviewBox>
            <Field className="w-full max-w-xs">
              <FieldLabel htmlFor="spec-price">Price Range</FieldLabel>
              <FieldDescription>Set your budget range ($200 - $800).</FieldDescription>
              <Slider
                id="spec-price"
                defaultValue={[620]}
                min={200}
                max={800}
                step={10}
                className="pt-2"
              />
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Fieldset">
          <PreviewBox>
            <FieldSet className="w-full max-w-sm">
              <FieldLegend>Department</FieldLegend>
              <FieldDescription>We need your address to deliver your order.</FieldDescription>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="spec-street">Street Address</FieldLabel>
                  <Input id="spec-street" defaultValue="123 Main St" />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="spec-city">City</FieldLabel>
                    <Input id="spec-city" defaultValue="New York" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="spec-postal">Postal Code</FieldLabel>
                    <Input id="spec-postal" defaultValue="90502" />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Checkbox">
          <PreviewBox>
            <FieldGroup className="w-full max-w-xs gap-5">
              <FieldSet>
                <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
                <FieldDescription>
                  Select the items you want to show on the desktop.
                </FieldDescription>
                <FieldGroup data-slot="checkbox-group" className="gap-3">
                  {(
                    [
                      { id: "spec-desktop-hard-disks", label: "Hard disks" },
                      { id: "spec-desktop-external-disks", label: "External disks" },
                      { id: "spec-desktop-cds", label: "CDs, DVDs, and iPods" },
                      { id: "spec-desktop-servers", label: "Connected servers" }
                    ] as const
                  ).map((item) => (
                    <Field key={item.id} orientation="horizontal" className="gap-2">
                      <Checkbox id={item.id} />
                      <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
                    </Field>
                  ))}
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <Field orientation="horizontal" className="gap-2">
                <Checkbox id="spec-sync-folders" defaultChecked />
                <FieldContent className="gap-0.5">
                  <FieldLabel htmlFor="spec-sync-folders">
                    Sync Desktop & Documents folders
                  </FieldLabel>
                  <FieldDescription className="text-foreground">
                    Your Desktop & Documents folders are being synced with iCloud Drive. You can
                    access them from other devices.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Radio">
          <PreviewBox>
            <FieldSet className="w-full max-w-xs">
              <FieldLegend variant="label">Subscription Plan</FieldLegend>
              <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
              <RadioGroup defaultValue="yearly" className="gap-3">
                {[
                  { id: "spec-plan-monthly", value: "monthly", label: "Monthly ($9.99/month)" },
                  { id: "spec-plan-yearly", value: "yearly", label: "Yearly ($99.99/year)" },
                  { id: "spec-plan-lifetime", value: "lifetime", label: "Lifetime ($299.99)" }
                ].map((plan) => (
                  <Field key={plan.id} orientation="horizontal" className="gap-2">
                    <RadioGroupItem value={plan.value} id={plan.id} />
                    <FieldLabel htmlFor={plan.id}>{plan.label}</FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Switch">
          <PreviewBox>
            <Field orientation="horizontal" className="w-auto items-center gap-2">
              <FieldLabel htmlFor="spec-mfa">Multi-factor authentication</FieldLabel>
              <Switch id="spec-mfa" />
            </Field>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Choice card"
          description={
            <>
              Wrap Field components inside FieldLabel to create selectable field groups. This works
              with RadioItem, Checkbox and Switch components.
            </>
          }
        >
          <PreviewBox>
            <FieldSet className="w-full max-w-xs">
              <FieldLegend>Compute Environment</FieldLegend>
              <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
              <RadioGroup defaultValue="kubernetes" className="gap-2">
                <FieldLabel htmlFor="spec-kubernetes">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Kubernetes</FieldTitle>
                      <FieldDescription>Run GPU workloads on a K8s cluster.</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="kubernetes" id="spec-kubernetes" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="spec-vm">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Virtual Machine</FieldTitle>
                      <FieldDescription>Access a cluster to run GPU workloads.</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="vm" id="spec-vm" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </FieldSet>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Field Group"
          description={
            <>
              Stack Field components with FieldGroup. Add FieldSeparator to divide them.
            </>
          }
        >
          <PreviewBox>
            <FieldGroup className="w-full max-w-xs gap-5">
              <FieldSet>
                <FieldLegend variant="label">Responses</FieldLegend>
                <FieldDescription>
                  Get notified when ChatGPT responds to requests that take time, like research or
                  image generation.
                </FieldDescription>
                <Field orientation="horizontal" className="gap-2 opacity-50" data-disabled>
                  <Checkbox id="spec-responses" defaultChecked disabled />
                  <FieldLabel htmlFor="spec-responses">Field label</FieldLabel>
                </Field>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend variant="label">Tasks</FieldLegend>
                <FieldDescription>
                  Get notified when tasks you&apos;ve created have updates.{" "}
                  <a href="https://ui.shadcn.com/docs/components/radix/field" className="underline">
                    Manage tasks
                  </a>
                </FieldDescription>
                <FieldGroup data-slot="checkbox-group" className="gap-5">
                  <Field orientation="horizontal" className="gap-2">
                    <Checkbox id="spec-push" />
                    <FieldLabel htmlFor="spec-push">Push notifications</FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="gap-2">
                    <Checkbox id="spec-email" />
                    <FieldLabel htmlFor="spec-email">Email notifications</FieldLabel>
                  </Field>
                </FieldGroup>
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
              <RtlPaymentForm />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Responsive Layout"
          description={
            <ul className="list-disc space-y-2 ps-6">
              <li>
                Vertical fields: Default orientation stacks label, control, and helper text—ideal
                for mobile-first layouts.
              </li>
              <li>
                Horizontal fields: Set orientation=&quot;horizontal&quot; on Field to align the label
                and control side-by-side. Pair with FieldContent to keep descriptions aligned.
              </li>
              <li>
                Responsive fields: Set orientation=&quot;responsive&quot; for automatic column
                layouts inside container-aware parents. Apply @container/field-group classes on
                FieldGroup to switch orientations at specific breakpoints.
              </li>
            </ul>
          }
        >
          <PreviewBox>
            <FieldSet className="w-full max-w-lg">
              <FieldLegend>Profile</FieldLegend>
              <FieldDescription>Fill in your profile information.</FieldDescription>
              <FieldGroup className="gap-5">
                <Field orientation="horizontal" className="items-center gap-2">
                  <FieldContent>
                    <FieldLabel htmlFor="spec-profile-username">Username</FieldLabel>
                    <FieldDescription>Choose a unique username for your account.</FieldDescription>
                  </FieldContent>
                  <Input id="spec-profile-username" defaultValue="Evil Rabbit" className="min-w-0 flex-1" />
                </Field>
                <div className="flex gap-2">
                  <Button type="button">Submit</Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </FieldGroup>
            </FieldSet>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
