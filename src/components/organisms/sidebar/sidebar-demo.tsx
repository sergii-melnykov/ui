/**
 * Storybook-only helpers for Sidebar design-spec examples.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  Bot,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Ellipsis,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Search,
  Settings2,
  Terminal
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar/avatar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/atoms/breadcrumb/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/atoms/collapsible/collapsible"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/atoms/input-group/input-group"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from "./sidebar"

export const DOC_NAV_SECTIONS = [
  {
    label: "Getting started",
    items: ["Installation", "Project Structure"]
  },
  {
    label: "Building Your Application",
    items: [
      "Routing",
      "Data Fetching",
      "Rendering",
      "Caching",
      "Styling",
      "Optimizing",
      "Configuring",
      "Testing",
      "Authentication",
      "Deploying",
      "Upgrading",
      "Examples"
    ]
  },
  {
    label: "API Reference",
    items: [
      "Components",
      "File Conventions",
      "Functions",
      "next.config.js Options",
      "Cli",
      "Edge Runtime"
    ]
  },
  {
    label: "Architecture",
    items: ["Accessibility", "Fast Refresh", "Next.js Compiler", "Supported Browsers", "Turbopack"]
  },
  {
    label: "Community",
    items: ["Contribution Guide"]
  }
] as const

export function DocsSidebarHeader({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Documentation</span>
              <span className="truncate text-xs">v1.0.0</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      {showSearch ? (
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." readOnly />
        </InputGroup>
      ) : null}
    </SidebarHeader>
  )
}

export function DocsSidebarNavFlat({ activeItem = "Data Fetching" }: { activeItem?: string }) {
  return (
    <>
      {DOC_NAV_SECTIONS.map((section) => (
        <SidebarGroup key={section.label}>
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuSubButton isActive={item === activeItem} asChild>
                    <a href="#">{item}</a>
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

export function DocsSidebarNavTree({ activeItem = "Data Fetching" }: { activeItem?: string }) {
  return (
    <>
      {DOC_NAV_SECTIONS.map((section) => (
        <SidebarGroup key={section.label}>
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item}>
                      <SidebarMenuSubButton isActive={item === activeItem} asChild>
                        <a href="#">{item}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

export function DocsSidebarNavCollapsible({ activeItem = "Data Fetching" }: { activeItem?: string }) {
  return (
    <>
      {DOC_NAV_SECTIONS.map((section) => (
        <SidebarGroup key={section.label}>
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {section.label}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {section.items.map((item) => (
                        <SidebarMenuSubItem key={item}>
                          <SidebarMenuSubButton isActive={item === activeItem} asChild>
                            <a href="#">{item}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}

export function AppChromeHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

export function DashboardPlaceholder({
  variant = "cards",
  className
}: {
  variant?: "cards" | "rows"
  className?: string
}) {
  if (variant === "rows") {
    return (
      <div className={cn("flex flex-col gap-4 overflow-auto p-4", className)}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="h-12 shrink-0 rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-1 flex-col gap-4 overflow-auto p-6", className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[198px] rounded-xl bg-muted" />
        ))}
      </div>
      <div className="min-h-[280px] flex-1 rounded-xl bg-muted" />
    </div>
  )
}

type SidebarAppPreviewProps = {
  sidebar: React.ReactNode
  contentVariant?: "cards" | "rows"
  className?: string
  sidebarProps?: React.ComponentProps<typeof Sidebar>
  defaultOpen?: boolean
}

export function SidebarAppPreview({
  sidebar,
  contentVariant = "cards",
  className,
  sidebarProps,
  defaultOpen = true
}: SidebarAppPreviewProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className={cn("min-h-0", className)}>
      <Sidebar collapsible="offcanvas" {...sidebarProps}>
        {sidebar}
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-h-0">
        <AppChromeHeader />
        <DashboardPlaceholder variant={contentVariant} />
      </SidebarInset>
    </SidebarProvider>
  )
}

export function SimpleDocsSidebarPreview(props: Omit<SidebarAppPreviewProps, "sidebar">) {
  return (
    <SidebarAppPreview
      {...props}
      sidebar={
        <>
          <DocsSidebarHeader />
          <SidebarContent>
            <DocsSidebarNavFlat />
          </SidebarContent>
        </>
      }
    />
  )
}

export const SIDEBAR_SPEC_USER = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "https://github.com/shadcn.png"
} as const

export function SidebarSpecLeadingIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground",
        className
      )}
    >
      <GalleryVerticalEnd className="size-4" />
    </div>
  )
}

function SpecSidebarShell({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}

function CollapsedShadcnSidebarExample() {
  const iconItems = [
    { icon: Terminal, id: "terminal" },
    { icon: Bot, id: "bot" },
    { icon: BookOpen, id: "book" },
    { icon: Settings2, id: "settings" }
  ] as const

  return (
    <SidebarProvider className="min-h-0 w-auto">
      <SpecSidebarShell className="h-[608px] w-12">
        <SidebarHeader className="items-center">
          <SidebarSpecLeadingIcon />
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarMenu>
            {iconItems.map(({ icon: Icon, id }) => (
              <SidebarMenuItem key={id}>
                <SidebarMenuButton className="size-8 justify-center">
                  <Icon />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="items-center">
          <Avatar className="size-8">
            <AvatarImage src={SIDEBAR_SPEC_USER.avatar} alt={SIDEBAR_SPEC_USER.name} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </SidebarFooter>
      </SpecSidebarShell>
    </SidebarProvider>
  )
}

function ExpandedShadcnSidebarExample() {
  const projectItems = [
    { label: "Design Engineering", icon: Frame },
    { label: "Sales & Marketing", icon: PieChart },
    { label: "Travel", icon: Map }
  ] as const

  return (
    <SidebarProvider className="min-h-0 w-auto">
      <SpecSidebarShell className="h-[608px] w-[255px]">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <SidebarSpecLeadingIcon />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs opacity-70">Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Terminal />
                        <span>Playground</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {(["History", "Starred", "Settings"] as const).map((item) => (
                          <SidebarMenuSubItem key={item}>
                            <SidebarMenuSubButton asChild>
                              <a href="#">{item}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                {(
                  [
                    { label: "Models", icon: Bot },
                    { label: "Documentation", icon: BookOpen },
                    { label: "Settings", icon: Settings2 }
                  ] as const
                ).map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs opacity-70">Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projectItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground/70">
                    <Ellipsis className="text-sidebar-foreground/70" />
                    <span>More</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="size-8">
                  <AvatarImage src={SIDEBAR_SPEC_USER.avatar} alt={SIDEBAR_SPEC_USER.name} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{SIDEBAR_SPEC_USER.name}</span>
                  <span className="truncate text-xs">{SIDEBAR_SPEC_USER.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SpecSidebarShell>
    </SidebarProvider>
  )
}

export function ShadcnSidebarExamplePair() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-7">
      <CollapsedShadcnSidebarExample />
      <ExpandedShadcnSidebarExample />
    </div>
  )
}
