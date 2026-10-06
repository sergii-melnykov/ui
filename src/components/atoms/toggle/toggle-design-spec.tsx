/**
 * Storybook-only layout mirroring the Figma Toggle & Toggle Group documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Bold,
  CircleFadingPlus,
  Italic,
  LayoutGrid,
  List,
  Underline
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/atoms/toggle-group/toggle-group"
import { cn } from "@/utils/index"

import { Toggle } from "./toggle"
import type { VariantProps } from "class-variance-authority"
import type { toggleVariants } from "./toggle.variants"

type ToggleVariant = NonNullable<VariantProps<typeof toggleVariants>["variant"]>
type ToggleSize = NonNullable<VariantProps<typeof toggleVariants>["size"]>

type ToggleState = "off" | "on" | "focus" | "disabled"
type TogglePosition = "single" | "left" | "right" | "middle"

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

function MatrixRowLabel({
  label,
  sublabel,
  className
}: {
  label: string
  sublabel?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex w-[78px] shrink-0 flex-col">
        {sublabel ? <span className="text-xs text-muted-foreground">{sublabel}</span> : null}
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="h-full min-h-9 w-3 border-l border-foreground" aria-hidden />
    </div>
  )
}

function SizeColumnHeaders() {
  const sizes = ["Small", "Default", "Large"] as const
  const states = ["Off", "On/Hover", "Focus", "Disabled"] as const

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="grid grid-cols-3 gap-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-6">
            <span className="text-sm font-medium text-muted-foreground">{size}</span>
            <div className="h-3 w-full border-b border-foreground" aria-hidden />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        {sizes.map((size) => (
          <div key={`${size}-states`} className="grid grid-cols-4 gap-4">
            {states.map((state) => (
              <span
                key={`${size}-${state}`}
                className="text-center text-xs font-medium text-muted-foreground"
              >
                {state}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function specPositionClass(position: TogglePosition, variant: ToggleVariant) {
  const rounded =
    position === "single"
      ? ""
      : position === "left"
        ? "rounded-none rounded-l-lg"
        : position === "right"
          ? "rounded-none rounded-r-lg"
          : "rounded-none"

  if (variant === "outline" && (position === "middle" || position === "right")) {
    return cn(rounded, "border-l-0")
  }

  return rounded
}

const sizeMap: Record<"Small" | "Default" | "Large", ToggleSize> = {
  Small: "sm",
  Default: "default",
  Large: "lg"
}

function SpecToggleCell({
  variant,
  size,
  state,
  position
}: {
  variant: ToggleVariant
  size: ToggleSize
  state: ToggleState
  position: TogglePosition
}) {
  const pressed = state === "on"
  const disabled = state === "disabled"
  const focused = state === "focus"

  return (
    <Toggle
      variant={variant}
      size={size}
      defaultPressed={pressed}
      disabled={disabled}
      aria-label="Toggle"
      className={cn(
        specPositionClass(position, variant),
        focused && !disabled && "border-ring ring-[3px] ring-ring/50"
      )}
    >
      Toggle
    </Toggle>
  )
}

function ToggleVariantMatrix({ variantLabel }: { variantLabel: "Outline" | "Ghost" }) {
  const variant: ToggleVariant = variantLabel === "Outline" ? "outline" : "default"
  const positions: TogglePosition[] = ["single", "left", "right", "middle"]
  const states: ToggleState[] = ["off", "on", "focus", "disabled"]
  const sizeLabels = ["Small", "Default", "Large"] as const

  return (
    <VariantGrid className="flex-col overflow-x-auto">
      <div className="flex gap-4 pl-[calc(78px+0.625rem+12px)]">
        <SizeColumnHeaders />
      </div>
      {positions.map((position) => (
        <div key={position} className="flex items-center gap-4">
          <MatrixRowLabel
            label={position.charAt(0).toUpperCase() + position.slice(1)}
            sublabel={variantLabel}
            className="min-h-9 shrink-0"
          />
          <div className="grid min-w-0 flex-1 grid-cols-3 gap-8">
            {sizeLabels.map((sizeLabel) => (
              <div key={sizeLabel} className="grid grid-cols-4 gap-4">
                {states.map((state) => (
                  <div
                    key={`${sizeLabel}-${state}`}
                    className="flex h-9 items-center justify-center"
                  >
                    <SpecToggleCell
                      variant={variant}
                      size={sizeMap[sizeLabel]}
                      state={state}
                      position={position}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </VariantGrid>
  )
}

function SpecToggleGroupCell({
  variant,
  size,
  state,
  position,
  orientation = "horizontal"
}: {
  variant: ToggleVariant
  size: ToggleSize
  state: ToggleState
  position: TogglePosition | "top" | "bottom"
  orientation?: "horizontal" | "vertical"
}) {
  const pressed = state === "on"
  const disabled = state === "disabled"
  const focused = state === "focus"

  if (position === "single") {
    return (
      <ToggleGroup
        type="single"
        variant={variant}
        size={size}
        orientation={orientation}
        defaultValue={pressed ? "a" : undefined}
        disabled={disabled}
        className="pointer-events-none"
      >
        <ToggleGroupItem
          value="a"
          aria-label="Toggle"
          className={cn(focused && !disabled && "border-ring ring-[3px] ring-ring/50")}
        >
          A
        </ToggleGroupItem>
      </ToggleGroup>
    )
  }

  const values = ["a", "b", "c"] as const
  const activeValue =
    position === "left" || position === "top"
      ? "a"
      : position === "middle"
        ? "b"
        : "c"

  return (
    <ToggleGroup
      type="single"
      variant={variant}
      size={size}
      orientation={orientation}
      defaultValue={pressed ? activeValue : undefined}
      disabled={disabled}
      className="pointer-events-none"
    >
      {values.map((value) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={`Toggle ${value}`}
          className={cn(
            value === activeValue && focused && !disabled && "border-ring ring-[3px] ring-ring/50"
          )}
        >
          {value === "a" ? "A" : value === "b" ? "B" : "C"}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function ToggleGroupVariantMatrix({
  variantLabel,
  orientation = "horizontal"
}: {
  variantLabel: "Outline" | "Ghost"
  orientation?: "horizontal" | "vertical"
}) {
  const variant: ToggleVariant = variantLabel === "Outline" ? "outline" : "default"
  const positions =
    orientation === "vertical"
      ? (["single", "top", "bottom", "middle"] as const)
      : (["single", "left", "right", "middle"] as const)
  const states: ToggleState[] = ["off", "on", "focus", "disabled"]
  const sizeLabels = ["Small", "Default", "Large"] as const

  return (
    <VariantGrid className="flex-col overflow-x-auto">
      <div className="flex gap-4 pl-[calc(78px+0.625rem+12px)]">
        <SizeColumnHeaders />
      </div>
      {positions.map((position) => (
        <div key={position} className="flex items-center gap-4">
          <MatrixRowLabel
            label={position.charAt(0).toUpperCase() + position.slice(1)}
            sublabel={variantLabel}
            className="min-h-9 shrink-0"
          />
          <div className="grid min-w-0 flex-1 grid-cols-3 gap-8">
            {sizeLabels.map((sizeLabel) => (
              <div key={sizeLabel} className="grid grid-cols-4 gap-4">
                {states.map((state) => (
                  <div
                    key={`${sizeLabel}-${state}`}
                    className="flex min-h-9 items-center justify-center"
                  >
                    <SpecToggleGroupCell
                      variant={variant}
                      size={sizeMap[sizeLabel]}
                      state={state}
                      position={position}
                      orientation={orientation}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </VariantGrid>
  )
}

export function ToggleDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Toggle & Toggle Group</h1>
          <p className="text-base text-muted-foreground">
            A two-state button that can be on or off, plus grouped toggles for related options.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/toggle" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Toggle">
          <ToggleVariantMatrix variantLabel="Outline" />
          <ToggleVariantMatrix variantLabel="Ghost" />
        </SpecSection>

        <SpecSection title="Toggle Group">
          <ToggleGroupVariantMatrix variantLabel="Outline" />
          <ToggleGroupVariantMatrix variantLabel="Ghost" />
          <ToggleGroupVariantMatrix variantLabel="Outline" orientation="vertical" />
          <ToggleGroupVariantMatrix variantLabel="Ghost" orientation="vertical" />
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Toggle"
          description="Use Toggle for a single on/off control with optional icons and sizes."
        >
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Toggle variant="outline" aria-label="List view">
                <List />
                List
              </Toggle>
              <Toggle variant="outline" defaultPressed aria-label="Grid view">
                <LayoutGrid />
                Grid
              </Toggle>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Outline" description="Outline variant with border and shadow-xs.">
          <PreviewBox>
            <Toggle variant="outline" aria-label="Toggle">
              Toggle
            </Toggle>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Size" description="Small, default, and large toggle sizes.">
          <PreviewBox>
            <div className="flex flex-wrap items-end justify-center gap-2">
              <Toggle size="sm" variant="outline" aria-label="Small">
                Small
              </Toggle>
              <Toggle variant="outline" aria-label="Default">
                Default
              </Toggle>
              <Toggle size="lg" variant="outline" aria-label="Large">
                Large
              </Toggle>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="With Icon" description="Leading and trailing icons inside the toggle.">
          <PreviewBox>
            <Toggle variant="outline" aria-label="Toggle with icons">
              <CircleFadingPlus />
              Toggle
              <CircleFadingPlus />
            </Toggle>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Toggle Group"
          description="Group related toggles with shared borders when spacing is zero."
        >
          <PreviewBox>
            <ToggleGroup type="single" variant="outline" defaultValue="all">
              <ToggleGroupItem value="all" aria-label="All">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="shared" aria-label="Shared">
                Shared
              </ToggleGroupItem>
            </ToggleGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Size" description="Toggle group items inherit size from the group.">
          <PreviewBox>
            <div className="flex flex-col items-center gap-3">
              <ToggleGroup type="single" variant="outline" size="sm" defaultValue="a">
                <ToggleGroupItem value="a">Small</ToggleGroupItem>
                <ToggleGroupItem value="b">Group</ToggleGroupItem>
                <ToggleGroupItem value="c">Row</ToggleGroupItem>
                <ToggleGroupItem value="d">Demo</ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup type="single" variant="outline" defaultValue="a">
                <ToggleGroupItem value="a">Default</ToggleGroupItem>
                <ToggleGroupItem value="b">Group</ToggleGroupItem>
                <ToggleGroupItem value="c">Row</ToggleGroupItem>
                <ToggleGroupItem value="d">Demo</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Spacing"
          description="Increase spacing to separate toggles while keeping the same variant."
        >
          <PreviewBox>
            <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
              <ToggleGroupItem value="a">One</ToggleGroupItem>
              <ToggleGroupItem value="b">Two</ToggleGroupItem>
              <ToggleGroupItem value="c">Three</ToggleGroupItem>
              <ToggleGroupItem value="d">Four</ToggleGroupItem>
            </ToggleGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Vertical" description="Stack toggle group items vertically.">
          <PreviewBox>
            <ToggleGroup
              type="single"
              variant="outline"
              orientation="vertical"
              defaultValue="bold"
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Icon" description="Icon-only toggle groups for toolbars.">
          <PreviewBox>
            <ToggleGroup type="multiple" variant="outline" defaultValue={["bold", "italic"]}>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Single" description="Single-selection toggle group for segmented controls.">
          <PreviewBox>
            <ToggleGroup type="single" variant="outline" defaultValue="all">
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="missed">Missed</ToggleGroupItem>
              <ToggleGroupItem value="unread">Unread</ToggleGroupItem>
            </ToggleGroup>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
