/**
 * Storybook-only layout mirroring the Figma Select documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldDescription, FieldLabel, FieldTitle } from "@/components/atoms/field/field"
import { Switch } from "@/components/atoms/switch/switch"
import { cn } from "@/utils/index"

import {
  FRUIT_GROUPS,
  FRUITS,
  RTL_FRUIT_GROUPS,
  TIMEZONE_GROUPS
} from "./select-shared"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "./select"

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

function MockSelectPanel({
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
        "flex flex-col rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>
  )
}

const selectTriggerSpecClassName = "rounded-lg"

function MockSelectLabel({
  dir = "ltr",
  children
}: {
  dir?: "ltr" | "rtl"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs text-muted-foreground",
        dir === "rtl" && "text-right"
      )}
    >
      {children}
    </div>
  )
}

function MockSelectItem({
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
        "relative flex items-center gap-2 rounded-sm py-1 text-sm",
        isRtl ? "flex-row-reverse pr-1.5 pl-2 text-right" : "pl-1.5 pr-2"
      )}
    >
      {isRtl && selected ? (
        <Check className="size-4 shrink-0" aria-hidden />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {!isRtl && selected ? (
        <Check className="size-4 shrink-0" aria-hidden />
      ) : null}
    </div>
  )
}

function AlignItemWithTriggerDemo() {
  const [itemAligned, setItemAligned] = React.useState(true)

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-5">
      <div className="flex items-start gap-2">
        <div className="flex flex-1 flex-col gap-0.5">
          <FieldTitle>Align Item</FieldTitle>
          <FieldDescription>Toggle to align the item with the trigger.</FieldDescription>
        </div>
        <Switch checked={itemAligned} onCheckedChange={setItemAligned} aria-label="Align item" />
      </div>
      <div className="relative h-[148px] w-full">
        <MockSelectPanel className="absolute inset-x-0 top-0">
          {FRUITS.map((fruit) => (
            <MockSelectItem key={fruit} selected={fruit === "Banana"}>
              {fruit}
            </MockSelectItem>
          ))}
        </MockSelectPanel>
        <Select defaultValue="banana">
          <SelectTrigger
            size="sm"
            className={cn("absolute inset-x-0 top-9 w-full", selectTriggerSpecClassName)}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent position={itemAligned ? "item-aligned" : "popper"}>
            {FRUITS.map((fruit) => (
              <SelectItem key={fruit} value={fruit.toLowerCase()}>
                {fruit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function GroupsExample() {
  return (
    <div className="relative flex h-[232px] w-48 flex-col justify-end py-9">
      <MockSelectPanel className="absolute inset-x-0 top-0 w-full">
        {FRUIT_GROUPS.map((group, groupIndex) => (
          <React.Fragment key={group.label}>
            {groupIndex > 0 ? <SelectSeparator className="my-1" /> : null}
            <MockSelectLabel>{group.label}</MockSelectLabel>
            {group.items.map((item) => (
              <MockSelectItem key={item} selected={item === "Banana"}>
                {item}
              </MockSelectItem>
            ))}
          </React.Fragment>
        ))}
      </MockSelectPanel>
      <Select defaultValue="banana">
        <SelectTrigger
          size="sm"
          className={cn("relative z-10 w-full", selectTriggerSpecClassName)}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="hidden">
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function ScrollableExample() {
  return (
    <div className="relative h-[252px] w-64">
      <MockSelectPanel className="absolute inset-x-0 top-0 flex h-[252px] flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto">
          {TIMEZONE_GROUPS.map((group, groupIndex) => (
            <React.Fragment key={group.label}>
              {groupIndex > 0 ? <SelectSeparator className="my-1" /> : null}
              <MockSelectLabel>{group.label}</MockSelectLabel>
              {group.items.map((item) => (
                <MockSelectItem key={item} selected={item === "Eastern Standard Time"}>
                  {item}
                </MockSelectItem>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-center py-1">
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
        </div>
      </MockSelectPanel>
      <Select defaultValue="eastern-standard-time">
        <SelectTrigger
          size="sm"
          className={cn("absolute inset-x-0 top-8 z-10 w-full", selectTriggerSpecClassName)}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="hidden">
          <SelectItem value="eastern-standard-time">Eastern Standard Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function InvalidExample() {
  return (
    <div className="relative h-[92px] w-48">
      <MockSelectPanel className="absolute inset-x-0 top-0 z-0 w-full">
        {FRUITS.slice(0, 3).map((fruit) => (
          <MockSelectItem key={fruit} selected={fruit === "Banana"}>
            {fruit}
          </MockSelectItem>
        ))}
      </MockSelectPanel>
      <Field data-invalid className="absolute inset-x-0 top-0.5 z-10 gap-2">
        <FieldLabel className="text-destructive">Fruit</FieldLabel>
        <Select defaultValue="">
          <SelectTrigger
            size="sm"
            className={cn("w-full text-destructive", selectTriggerSpecClassName)}
            aria-invalid
          >
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="hidden">
            <SelectItem value="apple">Apple</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription className="text-destructive">Please select a fruit.</FieldDescription>
      </Field>
    </div>
  )
}

function RtlExample() {
  return (
    <div className="relative flex h-[232px] w-48 flex-col justify-end py-9" dir="rtl">
      <MockSelectPanel dir="rtl" className="absolute inset-x-0 top-0 w-full">
        {RTL_FRUIT_GROUPS.map((group, groupIndex) => (
          <React.Fragment key={group.label}>
            {groupIndex > 0 ? <SelectSeparator className="my-1" /> : null}
            <MockSelectLabel dir="rtl">{group.label}</MockSelectLabel>
            {group.items.map((item) => (
              <MockSelectItem dir="rtl" key={item} selected={item === "موز"}>
                {item}
              </MockSelectItem>
            ))}
          </React.Fragment>
        ))}
      </MockSelectPanel>
      <Select defaultValue="moz">
        <SelectTrigger
          size="sm"
          className={cn("relative z-10 w-full", selectTriggerSpecClassName)}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="hidden">
          <SelectItem value="moz">موز</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function SelectDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Select</h1>
          <p className="text-base text-muted-foreground">
            Autocomplete input and command palette with a list of suggestions.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/select"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Align Item With Trigger"
          description={
            <>
              Use the <code className="text-sm">position</code> prop on{" "}
              <code className="text-sm">SelectContent</code> to control alignment. When{" "}
              <code className="text-sm">position=&quot;item-aligned&quot;</code> (default), the popup
              positions so the selected item appears over the trigger. When{" "}
              <code className="text-sm">position=&quot;popper&quot;</code>, the popup aligns to the
              trigger edge.
            </>
          }
        >
          <PreviewBox>
            <AlignItemWithTriggerDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Groups"
          description={
            <>
              Use <code className="text-sm">SelectGroup</code>,{" "}
              <code className="text-sm">SelectLabel</code>, and{" "}
              <code className="text-sm">SelectSeparator</code> to organize items.
            </>
          }
        >
          <PreviewBox>
            <GroupsExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Scrollable"
          description="A select with many items that scrolls."
        >
          <PreviewBox>
            <ScrollableExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Disabled" description="">
          <PreviewBox>
            <Select disabled>
              <SelectTrigger size="sm" className={cn("w-48", selectTriggerSpecClassName)}>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                {FRUITS.map((fruit) => (
                  <SelectItem key={fruit} value={fruit.toLowerCase()}>
                    {fruit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Invalid"
          description={
            <>
              Add the <code className="text-sm">data-invalid</code> attribute to the{" "}
              <code className="text-sm">Field</code> component and the{" "}
              <code className="text-sm">aria-invalid</code> attribute to the{" "}
              <code className="text-sm">SelectTrigger</code> component to show an error state.
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
