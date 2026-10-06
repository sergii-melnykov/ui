/**
 * Storybook-only layout mirroring the Figma Button Group documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bot,
  Check,
  ChevronDown,
  CircleFadingPlus,
  Copy,
  Minus,
  Plus,
  Search,
  Share,
  Trash2,
  UserRoundX,
  VolumeOff
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import type { ButtonSize, ButtonVariant } from "@/components/atoms/button/button.variants"
import { Input } from "@/components/atoms/input/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/atoms/popover/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/atoms/select/select"
import { Separator } from "@/components/atoms/separator/separator"
import { Textarea } from "@/components/atoms/textarea/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu/dropdown-menu"
import { cn } from "@/utils/index"

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText
} from "./button-group"

const SPEC_STATES = ["Default", "Hover", "Focus", "Disabled"] as const
const SPEC_SIZES = [
  { label: "Small", text: "sm" as const, icon: "icon-sm" as const },
  { label: "Default", text: "default" as const, icon: "icon" as const },
  { label: "Large", text: "lg" as const, icon: "icon-lg" as const }
]

type SpecState = "default" | "hover" | "focus" | "disabled"
type TextPosition = "single-rounded" | "single" | "left" | "right" | "middle"
type IconPosition = "single-rounded" | "single" | "left" | "right" | "top" | "bottom"

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
        "overflow-x-auto rounded-xl border border-dashed border-border p-5",
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

function VariantBlockLabel({ label, rowHeight }: { label: string; rowHeight: number }) {
  return (
    <div className="flex items-center gap-2.5" style={{ height: rowHeight }}>
      <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
      <div className="h-full w-3 border-l border-foreground" aria-hidden />
    </div>
  )
}

function MatrixColumnHeaders() {
  return (
    <div className="grid grid-cols-12 gap-x-4 pb-2">
      {SPEC_SIZES.map((size) => (
        <div key={size.label} className="col-span-4 flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{size.label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
          <div className="grid w-full grid-cols-4 gap-2">
            {SPEC_STATES.map((state) => (
              <span
                key={state}
                className="text-center text-xs font-medium text-muted-foreground"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function textPositionClass(position: TextPosition, size: "sm" | "default" | "lg"): string {
  const radius = size === "sm" ? "rounded-sm" : "rounded-lg"

  switch (position) {
    case "single-rounded":
      return "rounded-full"
    case "single":
      return radius
    case "left":
      return size === "sm" ? "rounded-l-sm rounded-r-none" : "rounded-l-lg rounded-r-none"
    case "right":
      return size === "sm" ? "rounded-r-sm rounded-l-none" : "rounded-r-lg rounded-l-none"
    case "middle":
      return "rounded-none border-l-0"
    default:
      return radius
  }
}

function iconPositionClass(position: IconPosition, size: "sm" | "default" | "lg"): string {
  const radius = size === "sm" ? "rounded-sm" : "rounded-lg"

  switch (position) {
    case "single-rounded":
      return "rounded-full"
    case "single":
      return radius
    case "left":
      return size === "sm" ? "rounded-l-sm rounded-r-none" : "rounded-l-lg rounded-r-none"
    case "right":
      return size === "sm" ? "rounded-r-sm rounded-l-none" : "rounded-r-lg rounded-l-none"
    case "top":
      return size === "sm" ? "rounded-t-sm rounded-b-none" : "rounded-t-lg rounded-b-none"
    case "bottom":
      return size === "sm" ? "rounded-b-sm rounded-t-none" : "rounded-b-lg rounded-t-none"
    default:
      return radius
  }
}

function specStateClass(variant: ButtonVariant, state: SpecState): string {
  if (state === "disabled") {
    return ""
  }
  if (state === "focus") {
    return "relative z-10 border-ring ring-[3px] ring-ring/50"
  }
  if (state === "hover") {
    if (variant === "outline") {
      return "bg-accent text-accent-foreground"
    }
    if (variant === "secondary") {
      return "bg-secondary/80"
    }
    if (variant === "ghost") {
      return "bg-accent text-accent-foreground"
    }
  }
  return ""
}

function SpecGroupTextButton({
  variant,
  size,
  state,
  position
}: {
  variant: ButtonVariant
  size: "sm" | "default" | "lg"
  state: SpecState
  position: TextPosition
}) {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={state === "disabled"}
      tabIndex={state === "focus" ? 0 : -1}
      className={cn(textPositionClass(position, size), specStateClass(variant, state))}
    >
      Button
    </Button>
  )
}

function SpecGroupIconButton({
  variant,
  size,
  state,
  position
}: {
  variant: ButtonVariant
  size: ButtonSize
  state: SpecState
  position: IconPosition
}) {
  const sizeKey = size === "icon-sm" ? "sm" : size === "icon-lg" ? "lg" : "default"

  return (
    <Button
      variant={variant}
      size={size}
      disabled={state === "disabled"}
      tabIndex={state === "focus" ? 0 : -1}
      aria-label="Add"
      className={cn(iconPositionClass(position, sizeKey), specStateClass(variant, state))}
    >
      <CircleFadingPlus />
    </Button>
  )
}

function TextButtonVariantBlock({
  label,
  variant,
  positions
}: {
  label: string
  variant: ButtonVariant
  positions: TextPosition[]
}) {
  const rowHeight = 94
  const blockHeight = positions.length * rowHeight

  return (
    <div className="flex gap-6">
      <div className="flex min-w-[100px] flex-col justify-center pt-[4.5rem]">
        <VariantBlockLabel label={label} rowHeight={blockHeight} />
      </div>
      <div className="min-w-[960px] flex-1">
        <MatrixColumnHeaders />
        {positions.map((position) => (
          <div
            key={position}
            className="grid h-[94px] grid-cols-12 items-center gap-x-4"
          >
            {SPEC_SIZES.flatMap((sizeCol) =>
              SPEC_STATES.map((stateLabel) => {
                const state = stateLabel.toLowerCase() as SpecState
                return (
                  <div key={`${position}-${sizeCol.label}-${stateLabel}`} className="flex justify-center">
                    <SpecGroupTextButton
                      variant={variant}
                      size={sizeCol.text}
                      state={state}
                      position={position}
                    />
                  </div>
                )
              })
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function IconButtonVariantBlock({
  label,
  variant,
  positions
}: {
  label: string
  variant: ButtonVariant
  positions: IconPosition[]
}) {
  const rowHeight = 94
  const blockHeight = positions.length * rowHeight

  return (
    <div className="flex gap-6">
      <div className="flex min-w-[100px] flex-col justify-center pt-[4.5rem]">
        <VariantBlockLabel label={label} rowHeight={blockHeight} />
      </div>
      <div className="min-w-[960px] flex-1">
        <MatrixColumnHeaders />
        {positions.map((position) => (
          <div
            key={position}
            className="grid h-[94px] grid-cols-12 items-center gap-x-4"
          >
            {SPEC_SIZES.flatMap((sizeCol) =>
              SPEC_STATES.map((stateLabel) => {
                const state = stateLabel.toLowerCase() as SpecState
                return (
                  <div key={`${position}-${sizeCol.label}-${stateLabel}`} className="flex justify-center">
                    <SpecGroupIconButton
                      variant={variant}
                      size={sizeCol.icon}
                      state={state}
                      position={position}
                    />
                  </div>
                )
              })
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const TEXT_POSITIONS_FULL: TextPosition[] = [
  "single-rounded",
  "single",
  "left",
  "right",
  "middle"
]
const TEXT_POSITIONS_GHOST: TextPosition[] = ["single-rounded", "single"]
const ICON_POSITIONS_FULL: IconPosition[] = [
  "single-rounded",
  "single",
  "left",
  "right",
  "top",
  "bottom"
]
const ICON_POSITIONS_GHOST: IconPosition[] = ["single-rounded", "single"]

function SizeExampleRow({
  size,
  labels
}: {
  size: { text: "sm" | "default" | "lg"; icon: ButtonSize }
  labels: [string, string, string]
}) {
  return (
    <ButtonGroup>
      <Button variant="outline" size={size.text}>
        {labels[0]}
      </Button>
      <Button variant="outline" size={size.text}>
        {labels[1]}
      </Button>
      <Button variant="outline" size={size.text}>
        {labels[2]}
      </Button>
      <Button variant="outline" size={size.icon} aria-label="Add">
        <Plus />
      </Button>
    </ButtonGroup>
  )
}

function CurrencySelectExample() {
  return (
    <ButtonGroup>
      <ButtonGroup className="gap-0">
        <Select defaultValue="usd">
          <SelectTrigger
            size="sm"
            className="h-8 w-fit rounded-r-none border-r-0 shadow-none focus:z-10"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">$</SelectItem>
            <SelectItem value="eur">€</SelectItem>
          </SelectContent>
        </Select>
        <Input
          defaultValue="10.00"
          className="h-8 w-44 rounded-l-none shadow-none focus-visible:z-10"
        />
      </ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Continue">
        <ArrowRight />
      </Button>
    </ButtonGroup>
  )
}

function RtlToolbarExample() {
  return (
    <div dir="rtl" className="flex flex-col items-center gap-2">
      <ButtonGroup className="gap-2">
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Previous page">
            <ArrowRight />
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="icon" aria-label="Next page">
            <ArrowLeft />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Decrease">
            <Minus />
          </Button>
          <Button variant="outline" size="icon" aria-label="Increase">
            <Plus />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Button Group</h1>
          <p className="text-base text-muted-foreground">
            A container that groups related buttons together with consistent styling.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/button-group"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Button Group Button">
          <VariantGrid className="flex flex-col gap-10">
            <TextButtonVariantBlock
              label="Outline"
              variant="outline"
              positions={TEXT_POSITIONS_FULL}
            />
            <TextButtonVariantBlock
              label="Secondary"
              variant="secondary"
              positions={TEXT_POSITIONS_FULL}
            />
            <TextButtonVariantBlock
              label="Ghost"
              variant="ghost"
              positions={TEXT_POSITIONS_GHOST}
            />
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Button Group Icon Button">
          <VariantGrid className="flex flex-col gap-10">
            <IconButtonVariantBlock
              label="Outline"
              variant="outline"
              positions={ICON_POSITIONS_FULL}
            />
            <IconButtonVariantBlock
              label="Secondary"
              variant="secondary"
              positions={ICON_POSITIONS_FULL}
            />
            <IconButtonVariantBlock
              label="Ghost"
              variant="ghost"
              positions={ICON_POSITIONS_GHOST}
            />
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Button Group Text">
          <VariantGrid className="justify-center">
            <ButtonGroup>
              <ButtonGroupText>Label</ButtonGroupText>
              <Button variant="outline">Action</Button>
            </ButtonGroup>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Button Group Separator">
          <VariantGrid className="justify-center">
            <ButtonGroup>
              <Button variant="secondary" size="sm">
                Copy
              </Button>
              <ButtonGroupSeparator />
              <Button variant="secondary" size="sm">
                Paste
              </Button>
            </ButtonGroup>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Orientation"
          description="Set the orientation prop to change the button group layout."
        >
          <PreviewBox>
            <ButtonGroup orientation="vertical" aria-label="Stepper" className="h-fit">
              <Button variant="outline" size="icon" aria-label="Increase">
                <Plus />
              </Button>
              <Button variant="outline" size="icon" aria-label="Decrease">
                <Minus />
              </Button>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Size"
          description="Control the size of buttons using the size prop on individual buttons."
        >
          <PreviewBox>
            <div className="flex flex-col items-center gap-8">
              <SizeExampleRow size={{ text: "sm", icon: "icon-sm" }} labels={["Small", "Button", "Group"]} />
              <SizeExampleRow
                size={{ text: "default", icon: "icon" }}
                labels={["Default", "Button", "Group"]}
              />
              <SizeExampleRow size={{ text: "lg", icon: "icon-lg" }} labels={["Large", "Button", "Group"]} />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Nested"
          description={
            <>
              Nest <code className="text-sm">&lt;ButtonGroup&gt;</code> components to create button
              groups with spacing.
            </>
          }
        >
          <PreviewBox>
            <ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="Add attachment">
                  <Plus />
                </Button>
              </ButtonGroup>
              <ButtonGroup className="min-w-0 flex-1">
                <InputGroup>
                  <InputGroupInput placeholder="Send a message..." />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" aria-label="Voice mode">
                      <AudioLines />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </ButtonGroup>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Separator"
          description="Use ButtonGroupSeparator to divide actions within the same variant."
        >
          <PreviewBox>
            <ButtonGroup>
              <Button variant="secondary" size="sm">
                Copy
              </Button>
              <ButtonGroupSeparator />
              <Button variant="secondary" size="sm">
                Paste
              </Button>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Split"
          description="Combine ButtonGroupSeparator with a text button and an icon button."
        >
          <PreviewBox>
            <ButtonGroup>
              <Button variant="secondary">Button</Button>
              <ButtonGroupSeparator />
              <Button variant="secondary" size="icon" aria-label="Add">
                <Plus />
              </Button>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Input"
          description="Attach an input to a trailing icon button for compact search or submit patterns."
        >
          <PreviewBox>
            <ButtonGroup className="w-full max-w-sm">
              <Input placeholder="Search..." />
              <Button variant="outline" size="icon" aria-label="Search">
                <Search />
              </Button>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Input Group"
          description="Nest InputGroup inside ButtonGroup for richer controls such as message composers."
        >
          <PreviewBox>
            <ButtonGroup className="w-full max-w-md [--radius:9999rem]">
              <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="Add attachment">
                  <Plus />
                </Button>
              </ButtonGroup>
              <ButtonGroup className="min-w-0 flex-1">
                <InputGroup>
                  <InputGroupInput placeholder="Send a message..." />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" aria-label="Voice mode">
                      <AudioLines />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </ButtonGroup>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Dropdown Menu"
          description="Pair a primary action with a dropdown trigger on the right."
        >
          <PreviewBox>
            <ButtonGroup>
              <Button variant="outline">Follow</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="More options">
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <VolumeOff />
                      Mute Conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check />
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AlertTriangle />
                      Report Conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserRoundX />
                      Block User
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share />
                      Share Conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy />
                      Copy Conversation
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 />
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Select" description="Pair with a Select component.">
          <PreviewBox>
            <CurrencySelectExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Popover"
          description="Use a popover on the trailing control for secondary configuration or context."
        >
          <PreviewBox>
            <ButtonGroup>
              <Button variant="outline">
                <Bot data-icon="inline-start" />
                Copilot
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open popover">
                    <ChevronDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72 rounded-xl p-0">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium">Agent Tasks</p>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-2 p-4 text-sm">
                    <Textarea
                      placeholder="Describe your task in natural language."
                      className="min-h-16 resize-none"
                    />
                    <p className="font-medium">Start a new task with Copilot</p>
                    <p className="text-muted-foreground">
                      Describe your task in natural language. Copilot will work in the background
                      and open a pull request for your review.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
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
            <RtlToolbarExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
