/**
 * Storybook-only layout mirroring the Figma Sidebar documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, ChevronRight, ChevronsUpDown, Terminal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar/avatar"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  ShadcnSidebarExamplePair,
  SIDEBAR_SPEC_USER,
  SidebarSpecLeadingIcon
} from "./sidebar-demo"
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarProvider,
  sidebarMenuButtonVariants
} from "./sidebar"

type SpecState = "default" | "hover" | "focus" | "disabled"

const MENU_BUTTON_STATES: SpecState[] = ["default", "hover", "focus", "disabled"]
const HEADER_STATES: Array<"default" | "hover"> = ["default", "hover"]
const GROUP_LABEL_STATES: Array<"default" | "focus"> = ["default", "focus"]

function menuButtonStateClassName(state: SpecState) {
  return cn(
    state === "hover" && "bg-sidebar-accent text-sidebar-accent-foreground",
    state === "focus" && "ring-[3px] ring-ring/50",
    state === "disabled" && "pointer-events-none opacity-50"
  )
}

function groupLabelStateClassName(state: "default" | "focus") {
  return cn(state === "focus" && "ring-[3px] ring-ring/50")
}

function subButtonStateClassName(state: SpecState) {
  return cn(
    state === "hover" && "bg-sidebar-accent text-sidebar-accent-foreground",
    state === "focus" && "ring-[3px] ring-ring/50",
    state === "disabled" && "pointer-events-none opacity-50"
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

function MatrixRowLabels({
  rows,
  rowClassName,
  className
}: {
  rows: string[]
  rowClassName?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {rows.map((row) => (
        <div key={row} className={cn("flex items-center gap-2.5", rowClassName)}>
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{row}</span>
          <div className="h-full min-h-8 w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function MatrixColumnHeaders({ columns }: { columns: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {columns.map((label) => (
        <div key={label} className="flex flex-col items-center gap-2.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function SpecMenuButton({
  collapsed,
  state
}: {
  collapsed: boolean
  state: SpecState
}) {
  const disabled = state === "disabled"

  if (collapsed) {
    return (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label="Playground"
        className={cn(
          sidebarMenuButtonVariants(),
          "size-8 justify-center",
          menuButtonStateClassName(state)
        )}
      >
        <Terminal />
      </button>
    )
  }

  return (
    <button
      type="button"
      tabIndex={-1}
      disabled={disabled}
      className={cn(
        sidebarMenuButtonVariants(),
        "w-[239px]",
        menuButtonStateClassName(state)
      )}
    >
      <Terminal />
      <span className="flex-1 truncate">Playground</span>
      <ChevronRight className="ml-auto" />
    </button>
  )
}

function SpecHeaderCell({
  collapsed,
  state
}: {
  collapsed: boolean
  state: "default" | "hover"
}) {
  if (collapsed) {
    return (
      <div className="flex h-[68px] items-center p-2">
        <SidebarSpecLeadingIcon />
      </div>
    )
  }

  return (
    <SidebarMenuButton
      size="lg"
      tabIndex={-1}
      className={cn("w-full max-w-[279px]", state === "hover" && "bg-sidebar-accent")}
    >
      <SidebarSpecLeadingIcon />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Acme Inc</span>
        <span className="truncate text-xs">Enterprise</span>
      </div>
      <ChevronsUpDown className="ml-auto" />
    </SidebarMenuButton>
  )
}

export function SidebarDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Sidebar</h1>
          <p className="text-base text-muted-foreground">
            A composable, themeable and customizable sidebar component.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/sidebar" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Leading Visual">
          <VariantGrid>
            <div className="flex min-w-[280px] flex-col gap-4">
              <MatrixColumnHeaders columns={["Icon", "Avatar"]} />
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="flex justify-center">
                  <SidebarSpecLeadingIcon />
                </div>
                <div className="flex justify-center">
                  <Avatar className="size-8">
                    <AvatarImage src={SIDEBAR_SPEC_USER.avatar} alt={SIDEBAR_SPEC_USER.name} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Sidebar Header">
          <VariantGrid>
            <SidebarProvider className="min-h-0 w-auto">
              <div className="flex min-w-[640px] gap-4">
                <MatrixRowLabels
                  rows={HEADER_STATES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
                  rowClassName="h-[68px]"
                  className="pt-14"
                />
                <div className="flex flex-1 flex-col gap-4">
                  <MatrixColumnHeaders columns={["Collapsed", "Expanded"]} />
                  <div className="grid grid-cols-2 gap-6">
                    {HEADER_STATES.map((state) => (
                      <React.Fragment key={state}>
                        <SpecHeaderCell collapsed state={state} />
                        <SpecHeaderCell collapsed={false} state={state} />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Menu Button">
          <VariantGrid>
            <div className="flex min-w-[640px] gap-4">
              <MatrixRowLabels
                rows={MENU_BUTTON_STATES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
                rowClassName="h-8"
                className="pt-14"
              />
              <div className="flex flex-1 flex-col gap-4">
                <MatrixColumnHeaders columns={["Collapsed", "Expanded"]} />
                <div className="grid grid-cols-2 gap-6">
                  {MENU_BUTTON_STATES.map((state) => (
                    <React.Fragment key={state}>
                      <SpecMenuButton collapsed state={state} />
                      <SpecMenuButton collapsed={false} state={state} />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Sidebar Group Label">
          <VariantGrid>
            <div className="flex min-w-[400px] gap-4">
              <MatrixRowLabels
                rows={GROUP_LABEL_STATES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
                rowClassName="h-8"
              />
              <div className="flex w-[279px] flex-col gap-6">
                {GROUP_LABEL_STATES.map((state) => (
                  <SidebarGroupLabel
                    key={state}
                    tabIndex={state === "focus" ? 0 : -1}
                    className={cn("text-xs opacity-70", groupLabelStateClassName(state))}
                  >
                    Platform
                  </SidebarGroupLabel>
                ))}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Sidebar Menu Sub Button">
          <VariantGrid>
            <div className="flex min-w-[400px] gap-4">
              <MatrixRowLabels
                rows={MENU_BUTTON_STATES.map((s) => s.charAt(0).toUpperCase() + s.slice(1))}
                rowClassName="h-7"
              />
              <div className="flex w-[231px] flex-col gap-6">
                {MENU_BUTTON_STATES.map((state) => (
                  <SidebarMenuSubButton
                    key={state}
                    href="#"
                    tabIndex={-1}
                    aria-disabled={state === "disabled"}
                    className={subButtonStateClassName(state)}
                    onClick={(event) => {
                      event.preventDefault()
                    }}
                  >
                    History
                  </SidebarMenuSubButton>
                ))}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>
        <h3 className="text-lg font-semibold text-foreground">Sidebar</h3>
        <PreviewBox>
          <ShadcnSidebarExamplePair />
        </PreviewBox>
      </div>
    </div>
  )
}
