/**
 * Storybook-only layout mirroring the Figma Native Select documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, Check } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption
} from "./native-select"

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
    <div className="flex flex-col gap-6 pt-[72px]">
      {rows.map((row) => (
        <div key={row} className="flex h-9 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-9 w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function MatrixColumnHeaders({ columns }: { columns: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {columns.map((label) => (
        <div key={label} className="flex flex-col items-center gap-6">
          <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

type SpecSelectState = "default" | "focus" | "destructive" | "disabled"

function SpecNativeSelect({
  dir = "ltr",
  state = "default",
  className
}: {
  dir?: "ltr" | "rtl"
  state?: SpecSelectState
  className?: string
}) {
  const disabled = state === "disabled"
  const destructive = state === "destructive"
  const focused = state === "focus"

  return (
    <div dir={dir} className={cn("w-[193px]", className)}>
      <NativeSelect
        dir={dir}
        disabled={disabled}
        aria-invalid={destructive || undefined}
        defaultValue="native-select"
        className={cn(
          dir === "rtl" && "text-right",
          focused && !disabled && !destructive && "border-ring ring-[3px] ring-ring/50",
          destructive &&
            !disabled &&
            "border-destructive ring-[3px] ring-destructive/20 dark:ring-destructive/40"
        )}
      >
        <NativeSelectOption value="native-select">Native Select</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}

/** Visual mock of the OS dropdown panel (Storybook documentation only). */
function MockDropdownPanel({
  dir = "ltr",
  children,
  className
}: {
  dir?: "ltr" | "rtl"
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      dir={dir}
      className={cn(
        "flex w-full flex-col rounded-md border border-neutral-500/90 bg-neutral-600 p-1 text-white shadow-[0_4px_3px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function MockSelectLabel({
  dir = "ltr",
  muted = false,
  children
}: {
  dir?: "ltr" | "rtl"
  muted?: boolean
  children: React.ReactNode
}) {
  const isRtl = dir === "rtl"

  return (
    <div
      className={cn(
        "flex items-center px-2 py-1.5 text-xs font-medium",
        muted && "opacity-50",
        isRtl && "flex-row-reverse justify-end text-right"
      )}
    >
      {!isRtl ? <span className="size-4 shrink-0" aria-hidden /> : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {isRtl ? <span className="size-4 shrink-0" aria-hidden /> : null}
    </div>
  )
}

function MockSelectOption({
  dir = "ltr",
  selected = false,
  children
}: {
  dir?: "ltr" | "rtl"
  selected?: boolean
  children: React.ReactNode
}) {
  const isRtl = dir === "rtl"

  return (
    <div
      className={cn(
        "flex items-center gap-0 px-2 py-1.5 text-xs font-medium",
        isRtl && "flex-row-reverse justify-end text-right"
      )}
    >
      {!isRtl ? (
        <span className="flex size-4 shrink-0 items-center justify-center">
          {selected ? <Check className="size-4" aria-hidden /> : null}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {isRtl ? (
        <span className="flex size-4 shrink-0 items-center justify-center">
          {selected ? <Check className="size-4" aria-hidden /> : null}
        </span>
      ) : null}
    </div>
  )
}

function GroupsExample() {
  return (
    <div className="flex flex-col items-start">
      <NativeSelect
        defaultValue="frontend"
        className="relative z-10 w-[188px] border-ring ring-[3px] ring-ring/50"
      >
        <NativeSelectOption value="" disabled>
          Select department
        </NativeSelectOption>
        <NativeSelectOptGroup label="Engineering">
          <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
          <NativeSelectOption value="backend">Backend</NativeSelectOption>
          <NativeSelectOption value="devops">DevOps</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Sales">
          <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
          <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
          <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Operations">
          <NativeSelectOption value="support">Customer Support</NativeSelectOption>
          <NativeSelectOption value="pm">Product Manager</NativeSelectOption>
          <NativeSelectOption value="ops-manager">Operations Manager</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
      <MockDropdownPanel className="-mt-9 w-[179px]">
        <MockSelectLabel>Select department</MockSelectLabel>
        <MockSelectLabel muted>Engineering</MockSelectLabel>
        <MockSelectOption selected>Frontend</MockSelectOption>
        <MockSelectOption>Backend</MockSelectOption>
        <MockSelectOption>DevOps</MockSelectOption>
        <MockSelectLabel muted>Sales</MockSelectLabel>
        <MockSelectOption>Sales Rep</MockSelectOption>
        <MockSelectOption>Account Manager</MockSelectOption>
        <MockSelectOption>Sales Director</MockSelectOption>
        <MockSelectLabel muted>Operations</MockSelectLabel>
        <MockSelectOption>Customer Support</MockSelectOption>
        <MockSelectOption>Product Manager</MockSelectOption>
        <MockSelectOption>Operations Manager</MockSelectOption>
      </MockDropdownPanel>
    </div>
  )
}

function InvalidExample() {
  return (
    <div className="flex flex-col items-start">
      <NativeSelect
        aria-invalid
        defaultValue="error"
        className="relative z-10 w-[114px]"
      >
        <NativeSelectOption value="error">Error state</NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelect>
      <MockDropdownPanel className="-mt-9 w-[112px]">
        <MockSelectOption selected>Error state</MockSelectOption>
        <MockSelectOption>Apple</MockSelectOption>
        <MockSelectOption>Banana</MockSelectOption>
        <MockSelectOption>Blueberry</MockSelectOption>
      </MockDropdownPanel>
    </div>
  )
}

function RtlExample() {
  return (
    <div className="flex flex-col items-start" dir="rtl">
      <NativeSelect
        dir="rtl"
        defaultValue="status"
        className="relative z-10 w-[114px] border-ring text-right ring-[3px] ring-ring/50"
      >
        <NativeSelectOption value="status">اختر الحالة</NativeSelectOption>
        <NativeSelectOption value="todo">مهام</NativeSelectOption>
        <NativeSelectOption value="progress">قيد التنفيذ</NativeSelectOption>
        <NativeSelectOption value="done">منجز</NativeSelectOption>
        <NativeSelectOption value="cancelled">ملغي</NativeSelectOption>
      </NativeSelect>
      <MockDropdownPanel dir="rtl" className="-mt-9 w-[112px]">
        <MockSelectOption dir="rtl" selected>
          اختر الحالة
        </MockSelectOption>
        <MockSelectOption dir="rtl">مهام</MockSelectOption>
        <MockSelectOption dir="rtl">قيد التنفيذ</MockSelectOption>
        <MockSelectOption dir="rtl">منجز</MockSelectOption>
        <MockSelectOption dir="rtl">ملغي</MockSelectOption>
      </MockDropdownPanel>
    </div>
  )
}

const MATRIX_ROWS: SpecSelectState[] = ["default", "focus", "destructive", "disabled"]

const MATRIX_ROW_LABELS: Record<SpecSelectState, string> = {
  default: "Default",
  focus: "Focus",
  destructive: "Destructive",
  disabled: "Disabled"
}

export function NativeSelectDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Native Select</h1>
          <p className="text-base text-muted-foreground">
            A styled native HTML select element with consistent design system integration.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/native-select"
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

        <SpecSection title="Native Select">
          <VariantGrid>
            <div className="flex min-w-[480px] gap-4">
              <MatrixRowLabels rows={MATRIX_ROWS.map((row) => MATRIX_ROW_LABELS[row])} />
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <MatrixColumnHeaders columns={["LTR", "RTL"]} />
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  {MATRIX_ROWS.flatMap((state) => [
                    <div key={`${state}-ltr`} className="flex h-9 items-center justify-center">
                      <SpecNativeSelect dir="ltr" state={state} />
                    </div>,
                    <div key={`${state}-rtl`} className="flex h-9 items-center justify-center">
                      <SpecNativeSelect dir="rtl" state={state} />
                    </div>
                  ])}
                </div>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Native Select Label">
          <VariantGrid>
            <div className="flex min-w-[280px] flex-col gap-4">
              <MatrixColumnHeaders columns={["LTR", "RTL"]} />
              <div className="grid grid-cols-2 gap-6">
                <MockDropdownPanel className="w-[94px]">
                  <MockSelectLabel muted>Native Select label</MockSelectLabel>
                </MockDropdownPanel>
                <MockDropdownPanel dir="rtl" className="w-[94px]">
                  <MockSelectLabel dir="rtl" muted>
                    Native Select label
                  </MockSelectLabel>
                </MockDropdownPanel>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Native Select Option">
          <VariantGrid>
            <div className="flex min-w-[280px] flex-col gap-4">
              <MatrixColumnHeaders columns={["LTR", "RTL"]} />
              <div className="grid grid-cols-2 gap-6">
                <MockDropdownPanel className="w-[94px]">
                  <MockSelectOption selected>Native select option</MockSelectOption>
                </MockDropdownPanel>
                <MockDropdownPanel dir="rtl" className="w-[94px]">
                  <MockSelectOption dir="rtl" selected>
                    Native select option
                  </MockSelectOption>
                </MockDropdownPanel>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Groups"
          description={
            <>
              Use <code className="text-sm">NativeSelectOptGroup</code> to organize options into
              categories.
            </>
          }
        >
          <PreviewBox>
            <GroupsExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Add the disabled prop to the NativeSelect component to disable the select."
        >
          <PreviewBox>
            <NativeSelect disabled defaultValue="disabled" className="w-[106px]">
              <NativeSelectOption value="disabled">Disabled</NativeSelectOption>
            </NativeSelect>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description={
            <>
              Use <code className="text-sm">aria-invalid</code> to show validation errors and the{" "}
              <code className="text-sm">data-invalid</code> attribute on the Field component for
              styling.
            </>
          }
        >
          <PreviewBox>
            <InvalidExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                className="underline underline-offset-4"
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
            <RtlExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
