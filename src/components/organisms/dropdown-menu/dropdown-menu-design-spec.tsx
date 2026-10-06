/**
 * Storybook-only layout mirroring the Figma Dropdown Menu documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Bell,
  Building2,
  CreditCard,
  Download,
  Eye,
  File,
  FileText,
  Folder,
  FolderOpen,
  LogOut,
  Mail,
  MessageSquare,
  PanelsTopLeft,
  Palette,
  Save,
  Settings,
  User,
  Wallet
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar/avatar"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

const menuItemClass =
  "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"

const menuLabelClass = "px-1.5 py-1 text-xs font-medium text-muted-foreground"

const menuSeparatorClass = "-mx-1 my-1 h-px bg-border"

const subTriggerClass =
  "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"

const checkboxItemClass =
  "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground"

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
    <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}>
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
        {selected ? (
          <span className="size-2 rounded-full bg-current" aria-hidden />
        ) : null}
      </span>
      {children}
    </div>
  )
}

function StaticMenuItemWithTrailingCheck({
  children,
  checked,
  disabled
}: {
  children: React.ReactNode
  checked?: boolean
  disabled?: boolean
}) {
  return (
    <div
      data-disabled={disabled ? true : undefined}
      className={cn(menuItemClass, disabled && "opacity-50")}
    >
      {children}
      {checked ? <Check className="ml-auto size-4" aria-hidden /> : null}
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
  "relative flex w-[120px] cursor-default items-center rounded-sm px-1.5 py-1 text-sm outline-hidden select-none"

function SpecDropdownMenuItem({
  dir = "ltr",
  state = "default",
  className
}: {
  dir?: "ltr" | "rtl"
  state?: "default" | "hover" | "disabled"
  className?: string
}) {
  const isRtl = dir === "rtl"
  const isDisabled = state === "disabled"
  const isHover = state === "hover"

  const rowClass = cn(
    specItemBase,
    className,
    isHover && "bg-accent text-accent-foreground",
    isDisabled && "opacity-50"
  )

  return (
    <div dir={dir} className={rowClass}>
      <span className={cn("truncate", isRtl && "w-full text-right")}>Menuitem</span>
    </div>
  )
}

function SpecDropdownMenuLabel({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="w-[192px]">
      <StaticMenuLabel className={cn(dir === "rtl" && "text-right")}>
        Dropdown menu label
      </StaticMenuLabel>
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
        "w-32 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
    >
      {children}
    </div>
  )
}

function OpenTrigger({ children = "Open" }: { children?: React.ReactNode }) {
  return (
    <Button variant="outline" size="sm" className="shadow-xs" type="button">
      {children}
    </Button>
  )
}

function BasicDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <MenuPanel>
        <StaticMenuLabel>My Account</StaticMenuLabel>
        <StaticMenuItem>Profile</StaticMenuItem>
        <StaticMenuItem>Billing</StaticMenuItem>
        <StaticMenuItem>Settings</StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem>Github</StaticMenuItem>
        <StaticMenuItem>Support</StaticMenuItem>
        <StaticMenuItem disabled>API</StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function SubmenuDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <div className="relative h-40 w-[250px]">
        <MenuPanel className="absolute left-0 top-0">
          <StaticMenuItem>Team</StaticMenuItem>
          <StaticSubTrigger>Invite Users</StaticSubTrigger>
          <StaticMenuItem>
            New Team
            <StaticMenuShortcut>⌘+T</StaticMenuShortcut>
          </StaticMenuItem>
        </MenuPanel>
        <MenuPanel className="absolute left-[122px] top-8">
          <StaticMenuItem>Email</StaticMenuItem>
          <StaticMenuItem>Message</StaticMenuItem>
          <StaticSubTrigger>More options</StaticSubTrigger>
          <StaticMenuSeparator />
          <StaticMenuItem>Advanced...</StaticMenuItem>
        </MenuPanel>
      </div>
    </div>
  )
}

function ShortcutsDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <MenuPanel>
        <StaticMenuLabel>My Account</StaticMenuLabel>
        <StaticMenuItem>
          Profile
          <StaticMenuShortcut>⇧⌘P</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          Billing
          <StaticMenuShortcut>⌘B</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          Settings
          <StaticMenuShortcut>⌘S</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem>
          Log out
          <StaticMenuShortcut>⇧⌘Q</StaticMenuShortcut>
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function AppearanceCheckboxesExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <MenuPanel>
        <StaticMenuLabel>Appearance</StaticMenuLabel>
        <StaticMenuItemWithTrailingCheck checked>Status Bar</StaticMenuItemWithTrailingCheck>
        <StaticMenuItemWithTrailingCheck disabled>Activity Bar</StaticMenuItemWithTrailingCheck>
        <StaticMenuItemWithTrailingCheck>Panel</StaticMenuItemWithTrailingCheck>
      </MenuPanel>
    </div>
  )
}

function NotificationCheckboxesExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTriggerWithLabel label="Notifications" />
      <MenuPanel className="w-48">
        <StaticMenuLabel>Notification Preferences</StaticMenuLabel>
        <StaticMenuItemWithTrailingCheck checked>
          <Mail />
          Email Notification
        </StaticMenuItemWithTrailingCheck>
        <StaticMenuItem>
          <MessageSquare />
          SMS Notification
        </StaticMenuItem>
        <StaticMenuItemWithTrailingCheck checked>
          <Bell />
          Push Notification
        </StaticMenuItemWithTrailingCheck>
      </MenuPanel>
    </div>
  )
}

function OpenTriggerWithLabel({ label }: { label: string }) {
  return (
    <Button variant="outline" size="sm" className="shadow-xs" type="button">
      {label}
    </Button>
  )
}

function IconsDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <MenuPanel>
        <StaticMenuItem>
          <User />
          Profile
        </StaticMenuItem>
        <StaticMenuItem>
          <CreditCard />
          Billing
        </StaticMenuItem>
        <StaticMenuItem>
          <Settings />
          Settings
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem variant="destructive">
          <LogOut />
          Log out
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function RadioDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <MenuPanel>
        <StaticMenuLabel>Panel Position</StaticMenuLabel>
        <StaticMenuItemWithTrailingCheck checked>Top</StaticMenuItemWithTrailingCheck>
        <StaticMenuItemWithTrailingCheck>Bottom</StaticMenuItemWithTrailingCheck>
        <StaticMenuItemWithTrailingCheck>Right</StaticMenuItemWithTrailingCheck>
      </MenuPanel>
    </div>
  )
}

function PaymentMethodRadioExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTriggerWithLabel label="Payment Method" />
      <MenuPanel className="w-48">
        <StaticMenuLabel>Select Payment Method</StaticMenuLabel>
        <StaticMenuItemWithTrailingCheck checked>
          <CreditCard />
          Credit Card
        </StaticMenuItemWithTrailingCheck>
        <StaticMenuItem>
          <Wallet />
          PayPal
        </StaticMenuItem>
        <StaticMenuItem>
          <Building2 />
          Bank Trasnfer
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function DestructiveDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTrigger />
      <MenuPanel>
        <StaticMenuItem>
          <User />
          Profile
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem variant="destructive">
          <LogOut />
          Delete Account
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function AvatarDropdownExample() {
  return (
    <div className="flex flex-col items-end gap-1">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <MenuPanel>
        <StaticMenuItem>Profile</StaticMenuItem>
        <StaticMenuItem>Billing</StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem>Log out</StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function ComplexMenuExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTriggerWithLabel label="Complex Menu" />
      <MenuPanel className="w-44">
        <StaticMenuLabel>File</StaticMenuLabel>
        <StaticMenuItem>
          <File />
          New File
          <StaticMenuShortcut>⌘N</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          <Folder />
          New Folder
          <StaticMenuShortcut>⇧⌘N</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticSubTrigger>
          <FolderOpen />
          Open Recent
        </StaticSubTrigger>
        <StaticMenuSeparator />
        <StaticMenuItem>
          <Save />
          Save
          <StaticMenuShortcut>⌘+T</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          <Download />
          Export
          <StaticMenuShortcut>⇧⌘E</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuLabel>View</StaticMenuLabel>
        <StaticSubTrigger>
          <Eye />
          Show Sidebar
        </StaticSubTrigger>
        <StaticMenuItem>
          <PanelsTopLeft />
          Show Status Bar
        </StaticMenuItem>
        <StaticSubTrigger>
          <Palette />
          Theme
        </StaticSubTrigger>
        <StaticMenuSeparator />
        <StaticMenuLabel>Account</StaticMenuLabel>
        <StaticMenuItem>
          <User />
          Profile
          <StaticMenuShortcut>⇧⌘P</StaticMenuShortcut>
        </StaticMenuItem>
        <StaticMenuItem>
          <CreditCard />
          Billing
        </StaticMenuItem>
        <StaticSubTrigger>
          <Settings />
          Settings
        </StaticSubTrigger>
        <StaticMenuSeparator />
        <StaticMenuItem>
          <CircleHelp />
          Help & Support
        </StaticMenuItem>
        <StaticMenuItem>
          <FileText />
          Documentation
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticMenuItem variant="destructive">
          <LogOut />
          Sign Out
          <StaticMenuShortcut>⇧⌘Q</StaticMenuShortcut>
        </StaticMenuItem>
      </MenuPanel>
    </div>
  )
}

function RtlDropdownExample() {
  return (
    <div className="flex flex-col items-start gap-1">
      <OpenTriggerWithLabel label="فتح القائمة" />
      <MenuPanel dir="rtl" className="w-48">
        <StaticMenuItem disabled>
          <ChevronLeft className="ml-0" />
          التنقل
        </StaticMenuItem>
        <StaticMenuSeparator />
        <StaticCheckboxItem checked>إظهار الإشارات المرجعية</StaticCheckboxItem>
        <StaticMenuSeparator />
        <StaticMenuLabel className="text-right">الأشخاص</StaticMenuLabel>
        <StaticRadioItem selected>Pedro Duarte</StaticRadioItem>
        <StaticRadioItem>Colm Tuite</StaticRadioItem>
      </MenuPanel>
    </div>
  )
}

function MatrixRowLabels({ title, states }: { title: string; states: string[] }) {
  return (
    <div className="flex gap-6">
      <div className="flex h-[84px] w-[90px] shrink-0 items-center gap-2.5">
        <span className="w-[78px] text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-full w-3 border-l border-foreground" aria-hidden />
      </div>
      <div className="flex flex-col justify-center gap-6">
        {states.map((state) => (
          <div key={state} className="flex h-7 items-center gap-2.5">
            <span className="w-[78px] text-sm font-medium text-muted-foreground">{state}</span>
            <div className="h-full w-3 border-l border-foreground" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DropdownMenuDesignSpec() {
  const itemStates = ["Default", "Hover", "Disabled"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Dropdown Menu</h1>
          <p className="text-base text-muted-foreground">
            Displays a menu to the user — such as a set of actions or functions — triggered by a
            button.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/dropdown-menu"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Component elements</h2>

        <SpecSection title="Dropdown Menu Label">
          <VariantGrid className="flex-col">
            <ColumnHeaders />
            <div className="grid w-full grid-cols-2 gap-6">
              <SpecDropdownMenuLabel dir="ltr" />
              <SpecDropdownMenuLabel dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Menu Item">
          <VariantGrid className="flex-nowrap gap-4 overflow-x-auto">
            <div className="flex flex-col gap-6 pt-14">
              <MatrixRowLabels title="State" states={[...itemStates]} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {itemStates.flatMap((state) => [
                  <SpecDropdownMenuItem
                    key={`${state}-ltr`}
                    dir="ltr"
                    state={state === "Default" ? "default" : state === "Hover" ? "hover" : "disabled"}
                  />,
                  <SpecDropdownMenuItem
                    key={`${state}-rtl`}
                    dir="rtl"
                    state={state === "Default" ? "default" : state === "Hover" ? "hover" : "disabled"}
                  />
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Dropdown">
          <VariantGrid className="w-fit">
            <MenuPanel>
              {Array.from({ length: 5 }, (_, index) => (
                <SpecDropdownMenuItem key={index} className="w-full" />
              ))}
            </MenuPanel>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A simple dropdown menu with labels, items, and a disabled entry."
        >
          <PreviewBox>
            <BasicDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Submenu"
          description="Use DropdownMenuSub to nest secondary actions."
        >
          <PreviewBox>
            <SubmenuDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Shortcuts"
          description="Add DropdownMenuShortcut to show keyboard hints."
        >
          <PreviewBox>
            <ShortcutsDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Icons" description="Combine icons with labels for quick scanning.">
          <PreviewBox>
            <IconsDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Checkboxes"
          description="Use DropdownMenuCheckboxItem for toggles."
        >
          <PreviewBox>
            <AppearanceCheckboxesExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Checkboxes with icons"
          description="Pair icons with checkbox items for richer preference menus."
        >
          <PreviewBox>
            <NotificationCheckboxesExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Radio" description="Use DropdownMenuRadioItem for exclusive choices.">
          <PreviewBox>
            <RadioDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Radio with icons"
          description="Show icons alongside radio items when options need extra context."
        >
          <PreviewBox>
            <PaymentMethodRadioExample />
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
            <DestructiveDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Avatar trigger"
          description="Use any element as the trigger, such as an avatar."
        >
          <PreviewBox>
            <AvatarDropdownExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Complex Menu"
          description="Combine labels, icons, shortcuts, submenus, and destructive actions."
        >
          <PreviewBox>
            <ComplexMenuExample />
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
            <RtlDropdownExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
