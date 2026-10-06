/**
 * Storybook-only layout mirroring the Figma Context Menu documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardPaste,
  Copy,
  Pencil,
  Scissors,
  Share,
  Trash2
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

const menuItemClass =
  "relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"

const menuLabelClass = "px-1.5 py-1 text-xs font-medium text-muted-foreground"

const menuSeparatorClass = "-mx-1 my-1 h-px bg-border"

const subTriggerClass =
  "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"

const checkboxItemClass =
  "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground"

const radioItemClass = checkboxItemClass

function StaticMenuItem({
  children,
  className,
  disabled,
  variant = "default"
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <div
      data-disabled={disabled ? true : undefined}
      data-variant={variant}
      className={cn(menuItemClass, className)}
    >
      {children}
    </div>
  )
}

function StaticMenuShortcut({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("ml-auto text-xs text-muted-foreground", className)}>
      {children}
    </span>
  )
}

function StaticMenuLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(menuLabelClass, className)}>{children}</div>
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
  checked
}: {
  children: React.ReactNode
  checked?: boolean
}) {
  return (
    <div className={checkboxItemClass}>
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
        {selected ? <Check className="size-4" aria-hidden /> : null}
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
    <div className="flex w-full flex-col items-center justify-center rounded-[18px] border border-border p-10">
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
  "relative flex w-[200px] cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"

function SpecContextMenuItem({
  dir = "ltr",
  variant = "default",
  state = "default"
}: {
  dir?: "ltr" | "rtl"
  variant?: "default" | "hover"
  state?: "default" | "disabled" | "destructive"
}) {
  const isRtl = dir === "rtl"
  const isDestructive = state === "destructive"
  const isDisabled = state === "disabled"
  const isHover = variant === "hover"

  const rowClass = cn(
    specItemBase,
    isHover && !isDestructive && !isDisabled && "bg-accent text-accent-foreground",
    isHover && isDisabled && "bg-accent opacity-50",
    isHover && isDestructive && "bg-destructive/10 text-destructive",
    !isHover && isDisabled && "opacity-50",
    !isHover && isDestructive && "text-destructive",
    isDestructive && "[&_svg]:text-destructive!"
  )

  const label = (
    <span className={cn("truncate", isRtl && "text-right")}>Label</span>
  )
  const shortcut = (
    <span className="text-xs text-muted-foreground">⌘L</span>
  )
  const leftIcon = <Check className="shrink-0" aria-hidden />
  const rightIcon = <ChevronRight className="ml-auto shrink-0" aria-hidden />

  return (
    <div dir={dir} className={rowClass}>
      {isRtl ? (
        <>
          {rightIcon}
          {shortcut}
          <span className="min-w-0 flex-1">{label}</span>
          {leftIcon}
        </>
      ) : (
        <>
          {leftIcon}
          <span className="min-w-0 flex-1">{label}</span>
          {shortcut}
          {rightIcon}
        </>
      )}
    </div>
  )
}

function SpecContextMenuLabel({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="w-[110px]">
      <StaticMenuLabel className={cn(dir === "rtl" && "text-right")}>Back</StaticMenuLabel>
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
        "w-36 rounded-md border bg-popover p-1 text-popover-foreground shadow-[0_4px_3px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  )
}

function BasicContextMenuExample() {
  return (
    <MenuPanel>
      <StaticMenuItem>Back</StaticMenuItem>
      <StaticMenuItem disabled>Forward</StaticMenuItem>
      <StaticMenuItem>Reload</StaticMenuItem>
    </MenuPanel>
  )
}

function SubmenuContextMenuExample() {
  return (
    <MenuPanel>
      <StaticMenuItem>
        Copy
        <StaticMenuShortcut>⌘C</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Cut
        <StaticMenuShortcut>⌘X</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticSubTrigger>More Tools</StaticSubTrigger>
    </MenuPanel>
  )
}

function ShortcutsContextMenuExample() {
  return (
    <MenuPanel className="w-36">
      <StaticMenuItem>
        Back
        <StaticMenuShortcut>⌘[</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem disabled>
        Forward
        <StaticMenuShortcut>⌘]</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Reload
        <StaticMenuShortcut>⌘R</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticMenuItem>
        Save
        <StaticMenuShortcut>⌘S</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Save As...
        <StaticMenuShortcut>⇧⌘S</StaticMenuShortcut>
      </StaticMenuItem>
    </MenuPanel>
  )
}

function GroupsContextMenuExample() {
  return (
    <MenuPanel className="w-36">
      <StaticMenuLabel>File</StaticMenuLabel>
      <StaticMenuItem>
        New File
        <StaticMenuShortcut>⌘N</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Open File
        <StaticMenuShortcut>⌘O</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Save
        <StaticMenuShortcut>⌘S</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticMenuLabel>Edit</StaticMenuLabel>
      <StaticMenuItem>
        Undo
        <StaticMenuShortcut>⌘Z</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Redo
        <StaticMenuShortcut>⇧⌘Z</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticMenuItem>
        Cut
        <StaticMenuShortcut>⌘X</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Copy
        <StaticMenuShortcut>⌘C</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuItem>
        Paste
        <StaticMenuShortcut>⌘V</StaticMenuShortcut>
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticMenuItem variant="destructive">
        Delete
        <StaticMenuShortcut>⌫</StaticMenuShortcut>
      </StaticMenuItem>
    </MenuPanel>
  )
}

function IconsContextMenuExample() {
  return (
    <MenuPanel>
      <StaticMenuItem>
        <Copy />
        Copy
      </StaticMenuItem>
      <StaticMenuItem>
        <Scissors />
        Cut
      </StaticMenuItem>
      <StaticMenuItem>
        <ClipboardPaste />
        Paste
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticMenuItem variant="destructive">
        <Trash2 />
        Delete
      </StaticMenuItem>
    </MenuPanel>
  )
}

function CheckboxesContextMenuExample() {
  return (
    <MenuPanel className="w-[188px]">
      <StaticCheckboxItem checked>Show Bookmarks Bar</StaticCheckboxItem>
      <StaticCheckboxItem>Show Full URLs</StaticCheckboxItem>
      <StaticCheckboxItem>Show Developer Tools</StaticCheckboxItem>
    </MenuPanel>
  )
}

function RadioContextMenuExample() {
  return (
    <MenuPanel>
      <StaticMenuLabel>People</StaticMenuLabel>
      <StaticRadioItem selected>Pedro Duarte</StaticRadioItem>
      <StaticRadioItem>Colm Tuite</StaticRadioItem>
      <StaticMenuSeparator />
      <StaticMenuLabel>Theme</StaticMenuLabel>
      <StaticRadioItem selected>Light</StaticRadioItem>
      <StaticRadioItem>Dark</StaticRadioItem>
      <StaticRadioItem>System</StaticRadioItem>
    </MenuPanel>
  )
}

function DestructiveContextMenuExample() {
  return (
    <MenuPanel>
      <StaticMenuItem>
        <Pencil />
        Edit
      </StaticMenuItem>
      <StaticMenuItem>
        <Share />
        Share
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticMenuItem variant="destructive">
        <Trash2 />
        Delete
      </StaticMenuItem>
    </MenuPanel>
  )
}

function RtlContextMenuExample() {
  return (
    <MenuPanel dir="rtl" className="w-48">
      <StaticMenuItem disabled>
        <ChevronLeft className="ml-0" />
        التنقل
      </StaticMenuItem>
      <StaticMenuItem>
        <ChevronLeft className="ml-0" />
        المزيد من الأدوات
      </StaticMenuItem>
      <StaticMenuSeparator />
      <StaticCheckboxItem checked>إظهار الإشارات المرجعية</StaticCheckboxItem>
      <StaticCheckboxItem>إظهار عناوين URL الكاملة</StaticCheckboxItem>
      <StaticMenuSeparator />
      <StaticMenuLabel className="text-right">الأشخاص</StaticMenuLabel>
      <StaticRadioItem selected>Pedro Duarte</StaticRadioItem>
      <StaticRadioItem>Colm Tuite</StaticRadioItem>
    </MenuPanel>
  )
}

function MatrixRowLabels({ title, states }: { title: string; states: string[] }) {
  return (
    <div className="flex gap-6">
      <div className="flex h-[132px] w-[90px] shrink-0 items-center gap-2.5">
        <span className="w-[78px] text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-full w-3 rounded-l-lg border-l border-foreground" aria-hidden />
      </div>
      <div className="flex flex-col justify-center gap-6">
        {states.map((state) => (
          <div key={state} className="flex h-7 items-center gap-2.5">
            <span className="w-[78px] text-sm font-medium text-muted-foreground">{state}</span>
            <div className="h-full w-3 rounded-l-lg border-l border-foreground" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ContextMenuDesignSpec() {
  const itemStates = ["Default", "Disabled", "Destructive"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Context Menu</h1>
          <p className="text-base text-muted-foreground">
            Displays a menu to the user — such as a set of actions or functions — triggered by a
            button.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/context-menu"
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

        <SpecSection title="Context Menu">
          <VariantGrid className="flex-nowrap gap-4 overflow-x-auto">
            <div className="flex flex-col gap-6 pt-[72px]">
              <MatrixRowLabels title="Default" states={[...itemStates]} />
              <MatrixRowLabels title="Hover" states={[...itemStates]} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-0">
                {(["default", "hover"] as const).flatMap((variant) =>
                  (["default", "disabled", "destructive"] as const).flatMap((state) => [
                    <SpecContextMenuItem
                      key={`${variant}-${state}-ltr`}
                      dir="ltr"
                      variant={variant}
                      state={state}
                    />,
                    <SpecContextMenuItem
                      key={`${variant}-${state}-rtl`}
                      dir="rtl"
                      variant={variant}
                      state={state}
                    />
                  ])
                )}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Context Menu Label">
          <VariantGrid>
            <div className="grid w-full grid-cols-2 gap-6">
              <SpecContextMenuLabel dir="ltr" />
              <SpecContextMenuLabel dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Basic" description="A simple context menu with a few actions.">
          <PreviewBox>
            <BasicContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Submenu"
          description="Use ContextMenuSub to nest secondary actions."
        >
          <PreviewBox>
            <SubmenuContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Shortcuts"
          description="Add ContextMenuShortcut to show keyboard hints."
        >
          <PreviewBox>
            <ShortcutsContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Groups"
          description="Group related actions and separate them with dividers."
        >
          <PreviewBox>
            <GroupsContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Icons" description="Combine icons with labels for quick scanning.">
          <PreviewBox>
            <IconsContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Checkboxes"
          description="Use ContextMenuCheckboxItem for toggles."
        >
          <PreviewBox>
            <CheckboxesContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Radio"
          description="Use ContextMenuRadioItem for exclusive choices."
        >
          <PreviewBox>
            <RadioContextMenuExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Destructive"
          description={
            <>
              Use <code>variant=&quot;destructive&quot;</code> to style the menu item as
              destructive.
            </>
          }
        >
          <PreviewBox>
            <DestructiveContextMenuExample />
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
            <RtlContextMenuExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
