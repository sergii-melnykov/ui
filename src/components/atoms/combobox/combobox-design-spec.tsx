/**
 * Storybook-only layout mirroring the Figma Combobox documentation page.
 */

import * as React from "react"
import { ArrowUpRight, Globe, X } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { InputGroupAddon, InputGroupText } from "@/components/atoms/input-group/input-group"
import { Label } from "@/components/atoms/label/label"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue
} from "./combobox"
import { FRAMEWORKS, FRAMEWORK_GROUPS } from "./combobox-shared"

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

function MatrixLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex min-w-[100px] flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className="flex h-7 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ColumnHeaders() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {(["LTR", "RTL"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ComboboxChipSpec({
  dir = "ltr",
  disabled = false
}: {
  dir?: "ltr" | "rtl"
  disabled?: boolean
}) {
  return (
    <span
      dir={dir}
      className={cn(
        "inline-flex h-[21px] w-fit items-center gap-1 rounded-md bg-muted pl-1.5 text-xs font-medium leading-4 text-foreground",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      SvelteKit
      <span className="inline-flex size-6 items-center justify-center opacity-50">
        <X className="size-3" aria-hidden />
      </span>
    </span>
  )
}

function ComboboxLabelSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <ComboboxLabel dir={dir} className="w-48">
      Combobox label
    </ComboboxLabel>
  )
}

function ComboboxItemSpec({
  state = "default"
}: {
  state?: "default" | "hover" | "disabled"
}) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-[192px] cursor-default items-center rounded-md py-1 pr-2 pl-1.5 text-sm text-popover-foreground",
        state === "hover" && "bg-accent text-accent-foreground",
        state === "disabled" && "opacity-50"
      )}
    >
      Combobox Item
    </div>
  )
}

function ComboboxListDefaultSpec() {
  return (
    <div className="w-[214px] rounded-lg border border-border bg-popover p-1 shadow-md">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="rounded-md py-1 pr-2 pl-1.5 text-sm">
          Combobox Item
        </div>
      ))}
    </div>
  )
}

function ComboboxListSeparatorSpec() {
  return (
    <div className="w-[214px] rounded-lg border border-border bg-popover p-1 shadow-md">
      <ComboboxLabel>Combobox label</ComboboxLabel>
      <div className="rounded-md py-1 pr-2 pl-1.5 text-sm">Combobox Item</div>
      <ComboboxSeparator />
      <ComboboxLabel>Combobox label</ComboboxLabel>
      <div className="rounded-md py-1 pr-2 pl-1.5 text-sm">Combobox Item</div>
    </div>
  )
}

function ComboboxListSearchSpec() {
  return (
    <div className="w-[214px] rounded-lg border border-border bg-popover p-1 shadow-md">
      <div className="mb-1 flex h-8 items-center rounded-lg border border-input px-2.5 py-1 text-sm text-muted-foreground shadow-xs">
        Search
      </div>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="rounded-md py-1 pr-2 pl-1.5 text-sm">
          Combobox Item
        </div>
      ))}
    </div>
  )
}

function ComboboxListLabelSpec() {
  return (
    <div className="w-[214px] rounded-lg border border-border bg-popover p-1 shadow-md">
      <ComboboxLabel>Combobox label</ComboboxLabel>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="rounded-md py-1 pr-2 pl-1.5 text-sm">
          Combobox Item
        </div>
      ))}
    </div>
  )
}

function BasicComboboxDemo({ className }: { className?: string }) {
  return (
    <div className={cn("w-[215px]", className)}>
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
      </Combobox>
    </div>
  )
}

function MultipleComboboxDemo({ className }: { className?: string }) {
  const [value, setValue] = React.useState<string[]>(["Next.js", "SvelteKit"])

  return (
    <div className={cn("w-full max-w-xs", className)}>
      <Combobox items={FRAMEWORKS} multiple value={value} onValueChange={setValue}>
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
      </Combobox>
    </div>
  )
}

function RtlComboboxDemo() {
  const [value, setValue] = React.useState<string[]>(["Next.js"])

  return (
    <Combobox items={FRAMEWORKS} multiple value={value} onValueChange={setValue}>
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput id="rtl-combobox-categories" placeholder="أضف فئات" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Combobox</h1>
          <p className="text-base text-muted-foreground">
            Autocomplete input with filterable suggestions, groups, and multi-select chips.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/combobox"
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

        <SpecSection title="Combobox Chip">
          <VariantGrid>
            <MatrixLabels rows={["Default", "Disabled"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <ComboboxChipSpec />
                <ComboboxChipSpec dir="rtl" />
                <ComboboxChipSpec disabled />
                <ComboboxChipSpec dir="rtl" disabled />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Combobox Label">
          <VariantGrid className="flex-col">
            <ColumnHeaders />
            <div className="grid w-full grid-cols-2 gap-6">
              <ComboboxLabelSpec />
              <ComboboxLabelSpec dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Combobox Item">
          <VariantGrid>
            <MatrixLabels rows={["Default", "Hover", "Disabled"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <ComboboxItemSpec />
                <ComboboxItemSpec />
                <ComboboxItemSpec state="hover" />
                <ComboboxItemSpec state="hover" />
                <ComboboxItemSpec state="disabled" />
                <ComboboxItemSpec state="disabled" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Combobox List">
          <VariantGrid className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Default</span>
              <ComboboxListDefaultSpec />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Separator</span>
              <ComboboxListSeparatorSpec />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Search</span>
              <ComboboxListSearchSpec />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-foreground">Label</span>
              <ComboboxListLabelSpec />
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="Single-select combobox with an input trigger and a filterable list."
        >
          <PreviewBox>
            <BasicComboboxDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Multiple"
          description="Multi-select with removable chips and an inline chips input."
        >
          <PreviewBox>
            <MultipleComboboxDemo />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Clear button"
          description="Use showClear on ComboboxInput to expose a clear control."
        >
          <PreviewBox>
            <div className="w-[215px]">
              <Combobox items={FRAMEWORKS}>
                <ComboboxInput placeholder="Select a framework" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
              </Combobox>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Groups"
          description="Organize items with ComboboxGroup, ComboboxLabel, and ComboboxCollection."
        >
          <PreviewBox>
            <div className="w-[215px]">
              <Combobox items={FRAMEWORKS}>
                <ComboboxInput placeholder="Select a framework" />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {FRAMEWORK_GROUPS.map((group, index) => (
                    <React.Fragment key={group.label}>
                      {index > 0 ? <ComboboxSeparator /> : null}
                      <ComboboxGroup items={group.items}>
                        <ComboboxLabel>{group.label}</ComboboxLabel>
                        <ComboboxCollection>
                          {(item: string) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxGroup>
                    </React.Fragment>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Input group"
          description="Add leading or trailing addons inside ComboboxInput via InputGroupAddon."
        >
          <PreviewBox>
            <div className="w-[240px]">
              <Combobox items={FRAMEWORKS}>
                <ComboboxInput placeholder="Select a framework">
                <InputGroupAddon align="inline-start">
                  <InputGroupText>
                    <Globe className="size-4" />
                  </InputGroupText>
                </InputGroupAddon>
                </ComboboxInput>
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Input only"
          description="Use ComboboxInput without ComboboxContent when the list is rendered elsewhere."
        >
          <PreviewBox>
            <div className="w-[215px]">
              <Combobox items={FRAMEWORKS}>
                <ComboboxInput placeholder="Select a framework" />
              </Combobox>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="With field label"
          description="Pair the combobox with Label for form layouts."
        >
          <PreviewBox>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="combobox-categories">Categories</Label>
              <MultipleComboboxDemo />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              Set <code>dir=&quot;rtl&quot;</code> on the combobox root for right-to-left layouts. See
              the{" "}
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
            <div dir="rtl" className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="rtl-combobox-categories">الفئات</Label>
              <RtlComboboxDemo />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
