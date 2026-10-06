/**
 * Storybook-only layout mirroring the Figma Menubar documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  File,
  Folder,
  Save
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

const menuItemClass =
  "relative flex cursor-default items-center gap-1.5 rounded-sm px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"

const menuSeparatorClass = "-mx-1 my-1 h-px bg-border"

const subTriggerClass =
  "flex cursor-default items-center gap-1.5 rounded-sm px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"

const checkboxItemClass =
  "relative flex cursor-default items-center gap-1.5 rounded-sm py-1 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:opacity-50"

const radioItemClass = checkboxItemClass

function StaticMenuItem({
  children,
  className,
  disabled
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  return (
    <div data-disabled={disabled ? true : undefined} className={cn(menuItemClass, className)}>
      {children}
    </div>
  )
}

function StaticMenuShortcut({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("ml-auto text-xs text-muted-foreground", className)}>{children}</span>
  )
}

function StaticMenuSeparator() {
  return <div className={menuSeparatorClass} role="separator" />
}

function StaticSubTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(subTriggerClass, className)}>
      {children}
      <ChevronRight className="ml-auto size-4" aria-hidden />
    </div>
  )
}

function StaticCheckboxItem({
  children,
  checked,
  disabled
}: {
  children: React.ReactNode
  checked?: boolean
  disabled?: boolean
}) {
  return (
    <div data-disabled={disabled ? true : undefined} className={checkboxItemClass}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {checked ? <Check className="size-4" aria-hidden /> : null}
      </span>
      {children}
    </div>
  )
}

function StaticRadioItem({
  children,
  selected
}: {
  children: React.ReactNode
  selected?: boolean
}) {
  return (
    <div className={radioItemClass}>
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {selected ? <span className="size-2 rounded-full bg-current" aria-hidden /> : null}
      </span>
      {children}
    </div>
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
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      {description ? (
        <p className="pt-4 text-base text-muted-foreground">{description}</p>
      ) : null}
      <div className={cn(description ? "pt-6" : "pt-4")}>{children}</div>
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

const specItemBase =
  "relative flex w-[120px] cursor-default items-center rounded-sm px-1.5 py-1 text-sm outline-hidden select-none"

function SpecMenubarItem({
  dir = "ltr",
  state = "default"
}: {
  dir?: "ltr" | "rtl"
  state?: "default" | "hover" | "disabled"
}) {
  const isRtl = dir === "rtl"
  const isDisabled = state === "disabled"
  const isHover = state === "hover"

  return (
    <div
      dir={dir}
      className={cn(
        specItemBase,
        isHover && "bg-accent text-accent-foreground",
        isDisabled && "opacity-50"
      )}
    >
      <span className={cn("truncate", isRtl && "w-full text-right")}>Menubar Item</span>
    </div>
  )
}

function MenuPanel({
  children,
  className,
  dir
}: {
  children: React.ReactNode
  className?: string
  dir?: "ltr" | "rtl"
}) {
  return (
    <div
      dir={dir}
      className={cn(
        "rounded-lg border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>
  )
}

function StaticMenubarBar({
  children,
  className,
  dir
}: {
  children: React.ReactNode
  className?: string
  dir?: "ltr" | "rtl"
}) {
  return (
    <div
      dir={dir}
      className={cn(
        "flex h-8 items-center gap-0.5 rounded-lg border bg-background p-[3px]",
        className
      )}
    >
      {children}
    </div>
  )
}

function StaticMenubarTrigger({
  children,
  active
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "flex h-6 items-center rounded-sm px-2 text-xs font-medium text-foreground",
        active && "bg-muted"
      )}
    >
      {children}
    </div>
  )
}

function MenubarGroupExample() {
  return (
    <MenuPanel className="w-32">
      {Array.from({ length: 5 }).map((_, index) => (
        <StaticMenuItem key={index}>Menubar Item</StaticMenuItem>
      ))}
    </MenuPanel>
  )
}

function CheckboxMenubarExample() {
  return (
    <div className="flex w-72 flex-col gap-1">
      <StaticMenubarBar>
        <StaticMenubarTrigger active>View</StaticMenubarTrigger>
        <StaticMenubarTrigger>Format</StaticMenubarTrigger>
      </StaticMenubarBar>
      <MenuPanel className="w-64">
        <StaticCheckboxItem>Always Show Bookmarks Bar</StaticCheckboxItem>
        <StaticCheckboxItem checked>Always Show Full URLs</StaticCheckboxItem>
        <StaticCheckboxItem disabled>New Incognito Window</StaticCheckboxItem>
        <StaticMenuSeparator />
        <StaticMenuItem>
          Reload
          <StaticMenuShortcut>⌘R</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          Force Reload
          <StaticMenuShortcut>⇧⌘R</StaticMenuShortcut>
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function RadioMenubarExample() {
  return (
    <div className="flex w-72 flex-col gap-1">
      <StaticMenubarBar>
        <StaticMenubarTrigger active>Profiles</StaticMenubarTrigger>
        <StaticMenubarTrigger>Theme</StaticMenubarTrigger>
      </StaticMenubarBar>
      <MenuPanel className="w-64">
        <StaticRadioItem>Andy</StaticRadioItem>
        <StaticRadioItem selected>Benoit</StaticRadioItem>
        <StaticRadioItem>Luis</StaticRadioItem>
        <StaticMenuSeparator />
        <StaticMenuItem>Edit</StaticMenuItem>
        <StaticMenuItem>Add Profile...</StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function SubmenuMenubarExample() {
  return (
    <div className="flex w-72 flex-col gap-1">
      <StaticMenubarBar>
        <StaticMenubarTrigger active>File</StaticMenubarTrigger>
        <StaticMenubarTrigger>Edit</StaticMenubarTrigger>
      </StaticMenubarBar>
      <MenuPanel className="w-36">
        <StaticSubTrigger>Share</StaticSubTrigger>
        <StaticMenuSeparator />
        <StaticMenuItem>
          Print...
          <StaticMenuShortcut>⌘P</StaticMenuShortcut>
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function IconsMenubarExample() {
  return (
    <div className="flex w-72 flex-col gap-1">
      <StaticMenubarBar>
        <StaticMenubarTrigger active>File</StaticMenubarTrigger>
        <StaticMenubarTrigger>More</StaticMenubarTrigger>
      </StaticMenubarBar>
      <MenuPanel className="w-36">
        <StaticMenuItem>
          <File aria-hidden />
          New File
          <StaticMenuShortcut>⌘N</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          <Folder aria-hidden />
          Open Folder
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem>
          <Save aria-hidden />
          Save
          <StaticMenuShortcut>⌘S</StaticMenuShortcut>
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function RtlMenubarExample() {
  return (
    <div dir="rtl" className="flex w-72 flex-col items-end gap-1">
      <StaticMenubarBar className="justify-end">
        <StaticMenubarTrigger>الملفات الشخصية</StaticMenubarTrigger>
        <StaticMenubarTrigger>عرض</StaticMenubarTrigger>
        <StaticMenubarTrigger>تعديل</StaticMenubarTrigger>
        <StaticMenubarTrigger active>ملف</StaticMenubarTrigger>
      </StaticMenubarBar>
      <MenuPanel className="w-48" dir="rtl">
        <StaticMenuItem>
          <StaticMenuShortcut className="ml-0 mr-auto">T⌘</StaticMenuShortcut>
          <span className="flex-1 text-right">علامة تبويب جديدة</span>
        </StaticMenuItem>
        <StaticMenuItem>
          <StaticMenuShortcut className="ml-0 mr-auto">N⌘</StaticMenuShortcut>
          <span className="flex-1 text-right">نافذة جديدة</span>
        </StaticMenuItem>
        <StaticMenuItem disabled>
          <span className="flex-1 text-right">نافذة التصفح المتخفي الجديدة</span>
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem>
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span className="flex-1 text-right">مشاركة</span>
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem>
          <StaticMenuShortcut className="ml-0 mr-auto">P⌘</StaticMenuShortcut>
          <span className="flex-1 text-right">طباعة...</span>
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function MatrixRowLabels({ states }: { states: readonly string[] }) {
  return (
    <div className="flex flex-col justify-center gap-6 pt-[72px]">
      {states.map((state) => (
        <div key={state} className="flex h-7 items-center gap-2.5">
          <span className="w-[78px] text-sm font-medium text-muted-foreground">{state}</span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

export function MenubarDesignSpec() {
  const itemStates = ["Default", "Hover", "Disabled"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Menubar</h1>
          <p className="text-base text-muted-foreground">
            A visually persistent menu common in desktop applications that provides quick access to
            a consistent set of commands.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/menubar" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Menubar Item">
          <VariantGrid className="flex-nowrap gap-4 overflow-x-auto">
            <MatrixRowLabels states={itemStates} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {itemStates.flatMap((state) => [
                  <SpecMenubarItem
                    key={`${state}-ltr`}
                    dir="ltr"
                    state={
                      state === "Default" ? "default" : state === "Hover" ? "hover" : "disabled"
                    }
                  />,
                  <SpecMenubarItem
                    key={`${state}-rtl`}
                    dir="rtl"
                    state={
                      state === "Default" ? "default" : state === "Hover" ? "hover" : "disabled"
                    }
                  />
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Menubar Group">
          <VariantGrid>
            <MenubarGroupExample />
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Checkbox"
          description="Use MenubarCheckboxItem for toggleable options."
        >
          <PreviewBox>
            <CheckboxMenubarExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Radio"
          description="Use MenubarRadioGroup and MenubarRadioItem for single-select options."
        >
          <PreviewBox>
            <RadioMenubarExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Submenu"
          description="Use MenubarSub, MenubarSubTrigger, and MenubarSubContent for nested menus."
        >
          <PreviewBox>
            <SubmenuMenubarExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="With Icons">
          <PreviewBox>
            <IconsMenubarExample />
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
            <RtlMenubarExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
