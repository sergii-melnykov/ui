/**
 * Storybook-only layout mirroring the Figma Input Group documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Copy,
  CreditCard,
  FileCode2,
  HelpCircle,
  Info,
  Link2,
  Loader2,
  Mail,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Star
} from "lucide-react"

import { ButtonGroup, ButtonGroupText } from "@/components/atoms/button-group/button-group"
import { Button } from "@/components/atoms/button/button"
import {
  Field,
  FieldDescription,
  FieldLabel
} from "@/components/atoms/field/field"
import { Kbd } from "@/components/atoms/kbd/kbd"
import { Label } from "@/components/atoms/label/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/atoms/popover/popover"
import { Separator } from "@/components/atoms/separator/separator"
import { Spinner } from "@/components/atoms/spinner/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/atoms/tooltip/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu/dropdown-menu"
import { cn } from "@/utils/index"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "./input-group"

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

function MatrixRowLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div key={row} className="flex h-[88px] items-center gap-2.5">
          <span className="w-[88px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full min-h-[70px] w-3 border-l border-foreground" aria-hidden />
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

type SpecState = "default" | "focus" | "destructive" | "disabled"

function SpecInputGroupPair({
  dir = "ltr",
  state = "default"
}: {
  dir?: "ltr" | "rtl"
  state?: SpecState
}) {
  const disabled = state === "disabled"
  const invalid = state === "destructive"
  const focused = state === "focus"

  const groupClass = cn(
    "w-full max-w-[240px]",
    focused && !disabled && "border-ring ring-[3px] ring-ring/50"
  )

  const inputProps = {
    readOnly: true,
    disabled,
    "aria-invalid": invalid || undefined,
    placeholder: "Input group control"
  } as const

  return (
    <div dir={dir} className="flex flex-col gap-6">
      <InputGroup className={groupClass} data-disabled={disabled ? true : undefined}>
        <InputGroupInput {...inputProps} />
      </InputGroup>
      <InputGroup
        className={cn(groupClass, "[--radius:9999px]")}
        data-disabled={disabled ? true : undefined}
      >
        <InputGroupInput {...inputProps} />
      </InputGroup>
    </div>
  )
}

function SpecInputGroupAddonPair({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="flex w-full max-w-[232px] flex-col gap-6">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Info className="size-4" aria-hidden />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-end">
          <Info className="size-4" aria-hidden />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function SpecInputGroupControlPair({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="w-full max-w-[192px]">
      <InputGroup>
        <InputGroupInput readOnly placeholder="Input group control" />
      </InputGroup>
    </div>
  )
}

function AlignFieldExample({
  id,
  children,
  description = "This is a field description."
}: {
  id: string
  children: React.ReactNode
  description?: string
}) {
  return (
    <Field className="w-full max-w-sm gap-2">
      <FieldLabel htmlFor={id}>Field label</FieldLabel>
      {children}
      <FieldDescription>{description}</FieldDescription>
    </Field>
  )
}

function CopyUrlExample() {
  const [copied, setCopied] = React.useState(false)

  return (
    <InputGroup>
      <InputGroupInput placeholder="https://x.com/shadcn" readOnly defaultValue="https://x.com/shadcn" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Copy"
          title="Copy"
          size="icon-xs"
          onClick={() => {
            navigator.clipboard.writeText("https://x.com/shadcn").catch(() => undefined)
            setCopied(true)
            window.setTimeout(() => {
              setCopied(false)
            }, 1500)
          }}
        >
          {copied ? <Check /> : <Copy />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

function FavoriteUrlExample() {
  const [favorite, setFavorite] = React.useState(false)

  return (
    <InputGroup className="[--radius:9999px]">
      <Popover>
        <PopoverTrigger asChild>
          <InputGroupAddon>
            <InputGroupButton variant="secondary" size="icon-xs" aria-label="Security info">
              <Info />
            </InputGroupButton>
          </InputGroupAddon>
        </PopoverTrigger>
        <PopoverContent align="start" className="flex flex-col gap-1 text-sm">
          <p className="font-medium">Your connection is not secure.</p>
          <p>You should not enter any sensitive information on this site.</p>
        </PopoverContent>
      </Popover>
      <InputGroupAddon className="pl-1.5 text-muted-foreground">https://</InputGroupAddon>
      <InputGroupInput defaultValue="example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label="Toggle favorite"
          aria-pressed={favorite}
          onClick={() => {
            setFavorite((value) => !value)
          }}
        >
          <Star className={cn(favorite && "fill-primary text-primary")} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function InputGroupDesignSpec() {
  const emailId = React.useId()
  const blockLabelId = React.useId()
  const labelBlockStartId = React.useId()

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Input Group</h1>
          <p className="text-base text-muted-foreground">
            Display additional information or actions to an input or textarea.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/input-group"
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

        <SpecSection title="Input Group Addon">
          <VariantGrid>
            <div className="flex flex-wrap gap-10">
              <MatrixColumnHeaders columns={["LTR", "RTL"]} />
            </div>
            <div className="flex gap-10">
              <SpecInputGroupAddonPair dir="ltr" />
              <SpecInputGroupAddonPair dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Input Group Control">
          <VariantGrid>
            <div className="flex flex-wrap gap-10">
              <MatrixColumnHeaders columns={["LTR", "RTL"]} />
            </div>
            <div className="flex gap-10">
              <SpecInputGroupControlPair dir="ltr" />
              <SpecInputGroupControlPair dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Input Group">
          <VariantGrid className="flex-col gap-6">
            <MatrixColumnHeaders columns={["LTR", "RTL"]} />
            <div className="flex gap-6">
              <MatrixRowLabels rows={["Default", "Focus", "Destructive", "Disabled"]} />
              <div className="grid flex-1 grid-cols-2 gap-6">
                {(["default", "focus", "destructive", "disabled"] as SpecState[]).map((state) => (
                  <React.Fragment key={state}>
                    <SpecInputGroupPair dir="ltr" state={state} />
                    <SpecInputGroupPair dir="rtl" state={state} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <ExampleBlock
          title="inline-start"
          description={
            <>
              Use <code className="text-sm">align=&quot;inline-start&quot;</code> to position the
              addon at the start of the input. This is the default.
            </>
          }
        >
          <PreviewBox>
            <AlignFieldExample id={emailId}>
              <InputGroup>
                <InputGroupAddon>
                  <Search className="size-4" aria-hidden />
                </InputGroupAddon>
                <InputGroupInput id={emailId} placeholder="Search" />
              </InputGroup>
            </AlignFieldExample>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="inline-end"
          description={
            <>
              Use <code className="text-sm">align=&quot;inline-end&quot;</code> to position the addon
              at the end of the input.
            </>
          }
        >
          <PreviewBox>
            <AlignFieldExample id={`${emailId}-inline-end`}>
              <InputGroup>
                <InputGroupInput id={`${emailId}-inline-end`} placeholder="Search" />
                <InputGroupAddon align="inline-end">
                  <Search className="size-4" aria-hidden />
                </InputGroupAddon>
              </InputGroup>
            </AlignFieldExample>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="block-start"
          description={
            <>
              Use <code className="text-sm">align=&quot;block-start&quot;</code> to position the addon
              above the input.
            </>
          }
        >
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-6">
              <AlignFieldExample id={blockLabelId}>
                <InputGroup>
                  <InputGroupAddon align="block-start" className="border-b">
                    <Label htmlFor={blockLabelId} className="text-foreground">
                      Email
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          aria-label="Help"
                          className="ml-auto rounded-full"
                          size="icon-xs"
                        >
                          <Info />
                        </InputGroupButton>
                      </TooltipTrigger>
                      <TooltipContent>We&apos;ll use this to send you notifications</TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                  <InputGroupInput id={blockLabelId} placeholder="shadcn@vercel.com" />
                </InputGroup>
              </AlignFieldExample>
              <AlignFieldExample id={`${blockLabelId}-textarea`}>
                <InputGroup>
                  <InputGroupAddon align="block-start" className="border-b">
                    <InputGroupText className="font-medium text-foreground">Message</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupTextarea
                    id={`${blockLabelId}-textarea`}
                    placeholder="Enter your message"
                    className="min-h-16"
                  />
                </InputGroup>
              </AlignFieldExample>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="block-end"
          description={
            <>
              Use <code className="text-sm">align=&quot;block-end&quot;</code> to position the addon
              below the input.
            </>
          }
        >
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-6">
              <AlignFieldExample id={`${blockLabelId}-block-end`}>
                <InputGroup>
                  <InputGroupInput id={`${blockLabelId}-block-end`} placeholder="shadcn@vercel.com" />
                  <InputGroupAddon align="block-end" className="border-t">
                    <InputGroupText className="text-xs text-muted-foreground">
                      We&apos;ll never share your email with anyone else.
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </AlignFieldExample>
              <AlignFieldExample id={`${blockLabelId}-block-end-textarea`}>
                <InputGroup>
                  <InputGroupTextarea
                    id={`${blockLabelId}-block-end-textarea`}
                    placeholder="Enter your message"
                    className="min-h-16"
                  />
                  <InputGroupAddon align="block-end" className="border-t">
                    <InputGroupText className="text-xs text-muted-foreground">
                      120 characters left
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </AlignFieldExample>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Icons" description="Add icons to the start or end of the input.">
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-6">
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search className="size-4" />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput type="email" placeholder="Enter your email" />
                <InputGroupAddon>
                  <Mail className="size-4" />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput placeholder="Card number" />
                <InputGroupAddon>
                  <CreditCard className="size-4" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Check className="size-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Text"
          description="Use InputGroupText for prefixes, suffixes, and helper copy."
        >
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-6">
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="0.00" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>USD</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="example.com" className="pl-0.5!" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupTextarea placeholder="Enter your message" />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-xs text-muted-foreground">
                    120 characters left
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Label"
          description="Place labels in inline or block-start addons."
        >
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-4">
              <InputGroup>
                <InputGroupInput id="input-group-username" placeholder="shadcn" />
                <InputGroupAddon>
                  <Label htmlFor="input-group-username">@</Label>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput id={labelBlockStartId} placeholder="shadcn@vercel.com" />
                <InputGroupAddon align="block-start">
                  <Label htmlFor={labelBlockStartId} className="text-foreground">
                    Email
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Help"
                        className="ml-auto rounded-full"
                        size="icon-xs"
                      >
                        <Info />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>We&apos;ll use this to send you notifications</TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Textarea"
          description="Stack block-start and block-end addons around a textarea."
        >
          <PreviewBox>
            <div className="grid w-full max-w-md gap-4">
              <InputGroup>
                <InputGroupTextarea
                  placeholder="console.log('Hello, world!');"
                  className="min-h-[200px] font-mono"
                />
                <InputGroupAddon align="block-end" className="border-t">
                  <InputGroupText>Line 1, Column 1</InputGroupText>
                  <InputGroupButton size="sm" className="ml-auto" variant="default">
                    Run
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupAddon align="block-start" className="border-b">
                  <InputGroupText className="font-mono font-medium">
                    <FileCode2 className="size-4" />
                    script.js
                  </InputGroupText>
                  <InputGroupButton className="ml-auto" size="icon-xs" aria-label="Refresh">
                    <RefreshCw />
                  </InputGroupButton>
                  <InputGroupButton variant="ghost" size="icon-xs" aria-label="Copy">
                    <Copy />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Button" description="Add icon or text buttons in addons.">
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-6">
              <CopyUrlExample />
              <FavoriteUrlExample />
              <InputGroup>
                <InputGroupInput placeholder="Type to search..." />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="secondary">Search</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Tooltip" description="Wrap addon buttons with tooltips for help text.">
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-4">
              <InputGroup>
                <InputGroupInput placeholder="Enter password" type="password" />
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton variant="ghost" aria-label="Info" size="icon-xs">
                        <Info />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>Password must be at least 8 characters</TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <InputGroupInput placeholder="Your email address" />
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton variant="ghost" aria-label="Help" size="icon-xs">
                        <HelpCircle />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>We&apos;ll use this to send you notifications</TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Spinner" description="Show loading state in disabled input groups.">
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-4">
              <InputGroup data-disabled>
                <InputGroupInput placeholder="Searching..." disabled />
                <InputGroupAddon align="inline-end">
                  <Spinner />
                </InputGroupAddon>
              </InputGroup>
              <InputGroup data-disabled>
                <InputGroupInput placeholder="Refreshing data..." disabled />
                <InputGroupAddon>
                  <Loader2 className="size-4 animate-spin" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="text-muted-foreground">Please wait...</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Dropdown" description="Open menus from addon buttons.">
          <PreviewBox>
            <div className="grid w-full max-w-sm gap-4">
              <InputGroup>
                <InputGroupInput placeholder="Enter file name" />
                <InputGroupAddon align="inline-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <InputGroupButton variant="ghost" aria-label="More" size="icon-xs">
                        <MoreHorizontal />
                      </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Copy path</DropdownMenuItem>
                      <DropdownMenuItem>Open location</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup className="[--radius:1rem]">
                <InputGroupInput placeholder="Enter search query" />
                <InputGroupAddon align="inline-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                        Search In... <ChevronDown className="size-3" />
                      </InputGroupButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="[--radius:0.95rem]">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                      <DropdownMenuItem>Changelog</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Button Group"
          description="Nest InputGroup inside ButtonGroup for URL-style fields."
        >
          <PreviewBox>
            <ButtonGroup className="w-full max-w-sm">
              <ButtonGroupText asChild>
                <Label htmlFor="input-group-url">https://</Label>
              </ButtonGroupText>
              <InputGroup>
                <InputGroupInput id="input-group-url" defaultValue="example" />
                <InputGroupAddon align="inline-end">
                  <Link2 className="size-4" />
                </InputGroupAddon>
              </InputGroup>
              <ButtonGroupText>.com</ButtonGroupText>
            </ButtonGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Prompt"
          description="Compose textarea controls with toolbar addons for chat-style input."
        >
          <PreviewBox>
            <InputGroup className="w-full max-w-sm">
              <InputGroupTextarea placeholder="Ask, Search or Chat..." />
              <InputGroupAddon align="block-end">
                <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
                  <Plus />
                </InputGroupButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <InputGroupButton variant="ghost">Auto</InputGroupButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" className="[--radius:0.95rem]">
                    <DropdownMenuItem>Auto</DropdownMenuItem>
                    <DropdownMenuItem>Agent</DropdownMenuItem>
                    <DropdownMenuItem>Manual</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupText className="ml-auto">52% used</InputGroupText>
                <Separator orientation="vertical" className="h-4!" />
                <InputGroupButton variant="default" className="rounded-full" size="icon-xs" disabled>
                  <ArrowUp />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Keyboard"
          description="Display keyboard hints in inline-end addons."
        >
          <PreviewBox>
            <InputGroup className="w-full max-w-xs">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              Set <code className="text-sm">dir=&quot;rtl&quot;</code> on InputGroup for right-to-left
              layouts. See the{" "}
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
            <InputGroup dir="rtl" className="w-full max-w-sm">
              <InputGroupInput placeholder="Input group control" className="text-right" />
              <InputGroupAddon align="inline-start">
                <CircleHelp className="size-4" />
              </InputGroupAddon>
            </InputGroup>
          </PreviewBox>
        </ExampleBlock>
      </div>

      <Separator />
    </div>
  )
}
