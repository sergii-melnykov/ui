/**
 * Storybook-only layout mirroring the Figma Button documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  ChevronDown,
  CircleFadingPlus,
  GitBranch,
  GitPullRequest,
  Plus
} from "lucide-react"

import { ButtonGroup, ButtonGroupText } from "@/components/atoms/button-group/button-group"
import { Kbd } from "@/components/atoms/kbd/kbd"
import { Separator } from "@/components/atoms/separator/separator"
import { Spinner } from "@/components/atoms/spinner/spinner"
import { cn } from "@/utils/index"

import { Button } from "./button"
import type { ButtonSize, ButtonVariant } from "./button.variants"

const VARIANTS: { label: string; value: ButtonVariant }[] = [
  { label: "Default", value: "default" },
  { label: "Outline", value: "outline" },
  { label: "Secondary", value: "secondary" },
  { label: "Ghost", value: "ghost" },
  { label: "Destructive", value: "destructive" },
  { label: "Link", value: "link" }
]

const TEXT_SIZES: { label: string; value: ButtonSize }[] = [
  { label: "Extra Small", value: "xs" },
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" }
]

const ICON_SIZES: { label: string; value: ButtonSize }[] = [
  { label: "Extra Small", value: "icon-xs" },
  { label: "Small", value: "icon-sm" },
  { label: "Default", value: "icon" },
  { label: "Large", value: "icon-lg" }
]

const STATE_COLUMNS = ["Default", "Hover", "Focus", "Disabled"] as const

type ButtonSpecState = "default" | "hover" | "focus" | "disabled"
type ButtonRoundness = "default" | "rounded"

const HOVER_BY_VARIANT = {
  default: "bg-primary/90",
  destructive: "bg-destructive/90",
  outline: "bg-accent text-accent-foreground",
  secondary: "bg-secondary/80",
  ghost: "bg-accent text-accent-foreground",
  link: "underline"
} as const

function specButtonStateClassName(
  variant: ButtonVariant,
  state: ButtonSpecState,
  roundness: ButtonRoundness
) {
  const resolvedVariant = variant ?? "default"
  const hoverClass =
    state === "hover"
      ? HOVER_BY_VARIANT[resolvedVariant as keyof typeof HOVER_BY_VARIANT]
      : undefined
  const focusClass =
    state === "focus" ? "border-ring ring-[3px] ring-ring/50" : undefined

  return cn(roundness === "rounded" && "rounded-full", hoverClass, focusClass)
}

function SpecButton({
  variant,
  size,
  state,
  roundness = "default",
  iconOnly = false
}: {
  variant: ButtonVariant
  size: ButtonSize
  state: ButtonSpecState
  roundness?: ButtonRoundness
  iconOnly?: boolean
}) {
  const disabled = state === "disabled"

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      tabIndex={-1}
      aria-label={iconOnly ? "Add" : undefined}
      className={specButtonStateClassName(variant, state, roundness)}
    >
      {iconOnly ? <CircleFadingPlus /> : "Button"}
    </Button>
  )
}

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
    <div className="flex min-w-[100px] flex-col gap-0 pt-[4.5rem]">
      {rows.map((row) => (
        <div key={row} className="flex h-36 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-36 w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function ButtonStateMatrix({
  rows,
  sizes,
  iconOnly = false
}: {
  rows: { label: string; value: ButtonVariant }[]
  sizes: { label: string; value: ButtonSize }[]
  iconOnly?: boolean
}) {
  const specStates: ButtonSpecState[] = ["default", "hover", "focus", "disabled"]
  const roundnessRows: ButtonRoundness[] = ["default", "rounded"]

  return (
    <div className="flex min-w-[1200px] gap-6">
      <MatrixRowLabels rows={rows.map((row) => row.label)} />
      <div className="flex min-w-0 flex-1 flex-col gap-0">
        <div className="grid grid-cols-4 gap-6 pb-2.5">
          {sizes.map((size) => (
            <div key={size.value} className="flex flex-col items-center gap-2.5">
              <span className="text-sm font-medium text-muted-foreground">{size.label}</span>
              <div className="h-3 w-full border-b border-foreground" aria-hidden />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 pb-4">
          {sizes.map((size) => (
            <div key={`${size.label}-states`} className="grid grid-cols-4 gap-2">
              {STATE_COLUMNS.map((label) => (
                <span
                  key={`${size.label}-${label}`}
                  className="text-center text-xs font-medium text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.value} className="flex h-36 flex-col justify-center gap-5">
            {roundnessRows.map((roundness) => (
              <div key={roundness} className="grid grid-cols-4 gap-6">
                {sizes.map((size) => (
                  <div key={size.value} className="grid grid-cols-4 gap-2">
                    {specStates.map((state) => (
                      <div key={state} className="flex justify-center">
                        <SpecButton
                          variant={row.value}
                          size={size.value}
                          state={state}
                          roundness={roundness}
                          iconOnly={iconOnly}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ButtonDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[1644px] flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Button</h1>
          <p className="text-base text-muted-foreground">
            Displays a button or a component that looks like a button.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/button" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Button">
          <VariantGrid>
            <ButtonStateMatrix rows={VARIANTS} sizes={TEXT_SIZES} />
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Icon Button">
          <VariantGrid>
            <ButtonStateMatrix
              rows={VARIANTS.filter((row) => row.value !== "link")}
              sizes={ICON_SIZES}
              iconOnly
            />
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Sizes"
          description="Buttons are available in extra small, small, default, and large sizes."
        >
          <PreviewBox>
            <div className="flex flex-wrap items-end justify-center gap-4">
              {TEXT_SIZES.map((size) => (
                <div key={size.value} className="flex items-center gap-2">
                  <Button size={size.value}>Button</Button>
                  <Button
                    variant="outline"
                    size={
                      size.value === "xs"
                        ? "icon-xs"
                        : size.value === "sm"
                          ? "icon-sm"
                          : size.value === "lg"
                            ? "icon-lg"
                            : "icon"
                    }
                    aria-label="Add"
                  >
                    <CircleFadingPlus />
                  </Button>
                </div>
              ))}
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Icon Left"
          description={
            <>
              Use <code>data-icon=&quot;inline-start&quot;</code> on the icon placed before the
              label.
            </>
          }
        >
          <PreviewBox>
            <Button>
              <CircleFadingPlus data-icon="inline-start" />
              Button
            </Button>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Icon Right"
          description={
            <>
              Use <code>data-icon=&quot;inline-end&quot;</code> on the icon placed after the label.
            </>
          }
        >
          <PreviewBox>
            <Button variant="outline">
              Button
              <CircleFadingPlus data-icon="inline-end" />
            </Button>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="With Kbd"
          description="Keyboard hints can be rendered inside a button using the Kbd component."
        >
          <PreviewBox>
            <Button variant="outline">
              Accept
              <Kbd>⇧</Kbd>
            </Button>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Icon Only" description="Use icon sizes for square icon-only buttons.">
          <PreviewBox>
            <Button variant="outline" size="icon" aria-label="Add">
              <Plus />
            </Button>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Loading"
          description={
            <>
              Compose loading buttons with <code>Spinner</code>, <code>disabled</code>, and{" "}
              <code>data-icon</code> on the spinner.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button disabled>
                <Spinner data-icon="inline-start" className="animate-spin" />
                Saving
              </Button>
              <Button variant="outline" disabled>
                Generating
                <Spinner data-icon="inline-end" className="animate-spin" />
              </Button>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Button Group" description="Group related actions with ButtonGroup.">
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button variant="outline" size="icon" aria-label="Previous">
                <ChevronDown className="rotate-90" />
              </Button>
              <ButtonGroup>
                <Button variant="outline">Archive</Button>
                <Button variant="outline">Report</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">Snooze</Button>
                <Button variant="outline" size="icon" aria-label="More">
                  <ChevronDown />
                </Button>
              </ButtonGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Link" description="Use asChild to render a link styled as a button.">
          <PreviewBox>
            <Button asChild>
              <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                Open docs
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Split with text"
          description="ButtonGroupText can label a grouped control."
        >
          <PreviewBox>
            <ButtonGroup>
              <ButtonGroupText>Repo</ButtonGroupText>
              <Button variant="outline">
                main
                <ChevronDown data-icon="inline-end" />
              </Button>
            </ButtonGroup>
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
            <div dir="rtl" className="flex flex-wrap items-center justify-center gap-2">
              <Button>
                <GitPullRequest data-icon="inline-start" />
                دمج طلب السحب
              </Button>
              <Button variant="outline" size="icon" aria-label="Create branch">
                <GitBranch />
              </Button>
              <Button variant="secondary">ثانوي</Button>
              <Button variant="outline">مخطط</Button>
              <Button variant="ghost">شبح</Button>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>

      <Separator />
    </div>
  )
}
