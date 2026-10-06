/**
 * Storybook-only layout mirroring the Figma Command documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  Bell,
  Calendar,
  Calculator,
  CircleHelp,
  ClipboardPaste,
  Code,
  Copy,
  CreditCard,
  FileText,
  Folder,
  FolderX,
  Home,
  Image as ImageIcon,
  Inbox,
  LayoutGrid,
  List,
  Plus,
  Scissors,
  Settings,
  Smile,
  Trash2,
  UserRound,
  ZoomIn,
  ZoomOut
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "./command"

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
    <div className="flex min-w-[280px] flex-col gap-6 pt-[72px]">
      {rows.map((row) => (
        <div key={row} className="flex h-8 items-center gap-2.5">
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

function SpecCommandItem({
  dir = "ltr",
  state = "default"
}: {
  dir?: "ltr" | "rtl"
  state?: "default" | "hover"
}) {
  const isRtl = dir === "rtl"
  const isHover = state === "hover"

  return (
    <div
      dir={dir}
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
        isHover && "bg-muted text-muted-foreground",
        isRtl && "justify-end"
      )}
    >
      {isRtl ? (
        <>
          <CommandShortcut className="ms-0 me-auto">⌘P</CommandShortcut>
          <span className={cn("text-right", isHover ? "text-muted-foreground" : "text-foreground")}>
            Profile
          </span>
          <UserRound
            className={cn("size-4 shrink-0", isHover ? "text-muted-foreground" : "text-foreground")}
            aria-hidden
          />
        </>
      ) : (
        <>
          <UserRound
            className={cn("size-4 shrink-0", isHover ? "text-muted-foreground" : "text-foreground")}
            aria-hidden
          />
          <span className={cn(isHover ? "text-muted-foreground" : "text-foreground")}>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </>
      )}
    </div>
  )
}

function SpecGroupHeading({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div
      dir={dir}
      className="flex h-7 items-center px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      <span className={cn("w-full", dir === "rtl" && "text-right")}>Suggestions</span>
    </div>
  )
}

function CommandPanel({
  children,
  className,
  dir
}: {
  children: React.ReactNode
  className?: string
  dir?: "ltr" | "rtl"
}) {
  return (
    <Command
      dir={dir}
      className={cn("flex w-96 flex-col border border-border shadow-sm", className)}
    >
      {children}
    </Command>
  )
}

function BasicCommandExample() {
  return (
    <CommandPanel>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPanel>
  )
}

function ShortcutsCommandExample() {
  return (
    <CommandPanel>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserRound />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPanel>
  )
}

function GroupsCommandExample() {
  return (
    <CommandPanel>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile />
            Search Emoji
          </CommandItem>
          <CommandItem>
            <Calculator />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserRound />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPanel>
  )
}

function ScrollableCommandExample() {
  return (
    <CommandPanel className="h-[332px] overflow-hidden">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="min-h-0 flex-1 overflow-y-auto">
        <CommandGroup heading="Navigation">
          <CommandItem>
            <Home />
            Home
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Inbox />
            Inbox
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileText />
            Documents
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Folder />
            Folders
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <Plus />
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FolderX />
            New Folder
            <CommandShortcut>⇧⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy />
            Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Scissors />
            Cut
            <CommandShortcut>⌘X</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <ClipboardPaste />
            Paste
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Trash2 />
            Delete
            <CommandShortcut>⌫</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="View">
          <CommandItem>
            <LayoutGrid />
            Grid View
          </CommandItem>
          <CommandItem>
            <List />
            List View
          </CommandItem>
          <CommandItem>
            <ZoomIn />
            Zoom In
            <CommandShortcut>⌘-</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <ZoomOut />
            Zoom Out
            <CommandShortcut>⌘+</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem>
            <UserRound />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Bell />
            Notifications
          </CommandItem>
          <CommandItem>
            <CircleHelp />
            Help & Support
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tools">
          <CommandItem>
            <Calculator />
            Calculator
          </CommandItem>
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <ImageIcon />
            Image Editor
          </CommandItem>
          <CommandItem>
            <Code />
            Code Editor
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPanel>
  )
}

function RtlCommandExample() {
  return (
    <CommandPanel dir="rtl">
      <CommandInput placeholder="اكتب أمرًا أو ابحث..." />
      <CommandList>
        <CommandGroup heading="اقتراحات">
          <CommandItem>
            التقويم
            <Calendar />
          </CommandItem>
          <CommandItem>
            البحث عن الرموز التعبيرية
            <Smile />
          </CommandItem>
          <CommandItem>
            الآلة الحاسبة
            <Calculator />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="الإعدادات">
          <CommandItem>
            <CommandShortcut className="ms-0 me-auto">P⌘</CommandShortcut>
            الملف الشخصي
            <UserRound />
          </CommandItem>
          <CommandItem>
            <CommandShortcut className="ms-0 me-auto">B⌘</CommandShortcut>
            الفوترة
            <CreditCard />
          </CommandItem>
          <CommandItem>
            <CommandShortcut className="ms-0 me-auto">S⌘</CommandShortcut>
            الإعدادات
            <Settings />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandPanel>
  )
}

export function CommandDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Command</h1>
          <p className="text-base text-muted-foreground">
            Fast, composable, unstyled command menu for React.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/command" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Command Item">
          <VariantGrid className="flex-nowrap gap-4 overflow-x-auto">
            <MatrixLabels rows={["Default", "Hover"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <SpecCommandItem dir="ltr" state="default" />
                <SpecCommandItem dir="rtl" state="default" />
                <SpecCommandItem dir="ltr" state="hover" />
                <SpecCommandItem dir="rtl" state="hover" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="CMDK Group Heading">
          <VariantGrid>
            <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                <SpecGroupHeading dir="ltr" />
                <SpecGroupHeading dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Basic" description="A simple command menu in a dialog.">
          <PreviewBox>
            <BasicCommandExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Shortcuts" description="">
          <PreviewBox>
            <ShortcutsCommandExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Groups"
          description="A command menu with groups, icons and separators."
        >
          <PreviewBox>
            <GroupsCommandExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Scrollable" description="Scrollable command menu with multiple items.">
          <PreviewBox>
            <ScrollableCommandExample />
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
            <RtlCommandExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
