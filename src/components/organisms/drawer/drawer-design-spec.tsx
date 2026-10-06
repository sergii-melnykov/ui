/**
 * Storybook-only layout mirroring the Figma Drawer documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, Minus, Plus, X } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldGroup, FieldLabel } from "@/components/atoms/field/field"
import { Input } from "@/components/atoms/input/input"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "./drawer"

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const RTL_GOAL_CHART_DATA = [
  { goal: 349 },
  { goal: 278 },
  { goal: 300 },
  { goal: 189 },
  { goal: 200 },
  { goal: 200 },
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 400 },
  { goal: 600 },
  { goal: 800 }
]

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

const drawerPanelShadow =
  "shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]"

function StaticDrawerShell({
  children,
  className,
  showHandle,
  surface = "popover"
}: {
  children: React.ReactNode
  className?: string
  showHandle?: boolean
  surface?: "popover" | "background"
}) {
  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col overflow-hidden",
        drawerPanelShadow,
        surface === "background" ? "bg-background" : "bg-popover",
        className
      )}
    >
      {showHandle ? (
        <div className="flex justify-center pt-4">
          <div className="h-2 w-[100px] rounded-full bg-muted" aria-hidden />
        </div>
      ) : null}
      {children}
    </div>
  )
}

function MoveGoalFooter() {
  return (
    <DrawerFooter className="p-5">
      <Button className="w-full">Submit</Button>
      <Button variant="outline" className="w-full">
        Cancel
      </Button>
    </DrawerFooter>
  )
}

function MoveGoalBody({ paragraphs = 1 }: { paragraphs?: number }) {
  return (
    <div className="flex flex-col px-4">
      {Array.from({ length: paragraphs }).map((_, index) => (
        <p key={index} className="pb-4 text-sm leading-5 text-foreground">
          {LOREM}
        </p>
      ))}
    </div>
  )
}

function MoveGoalHeader({ className }: { className?: string }) {
  return (
    <DrawerHeader className={className}>
      <DrawerTitle>Move Goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </DrawerHeader>
  )
}

function DrawerHeaderSpec({ align }: { align: "ltr" | "rtl" | "center" }) {
  return (
    <DrawerHeader
      dir={align === "rtl" ? "rtl" : undefined}
      className={cn(
        "w-full max-w-sm",
        align === "rtl" && "items-end text-right",
        align === "center" && "items-center text-center"
      )}
    >
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>
        Make changes to your profile here. Click save when you&apos;re done.
      </DrawerDescription>
    </DrawerHeader>
  )
}

function HeaderAlignmentMatrix() {
  const columns = [
    { label: "LTR", align: "ltr" as const },
    { label: "RTL", align: "rtl" as const },
    { label: "None", align: "center" as const }
  ]

  return (
    <div className="rounded-xl border border-dashed border-border p-5">
      <div className="flex flex-col gap-4">
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map(({ label }) => (
            <div key={label} className="flex flex-col items-center gap-6">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <div className="h-3 w-full border-b border-foreground" aria-hidden />
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map(({ label, align }) => (
            <DrawerHeaderSpec key={label} align={align} />
          ))}
        </div>
      </div>
    </div>
  )
}

function RtlMoveGoalPreview() {
  return (
    <StaticDrawerShell
      className="max-w-none rounded-t-xl"
      showHandle
      surface="background"
    >
      <DrawerHeader className="items-center text-center">
        <DrawerTitle>نقل الهدف</DrawerTitle>
        <DrawerDescription>حدد هدف نشاطك اليومي.</DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col items-center px-4 pt-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8 rounded-full">
            <Minus className="size-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex flex-col items-center px-4">
            <span className="text-7xl font-bold leading-none text-foreground">٣٥٠</span>
            <span className="text-xs text-muted-foreground">سعرات حرارية/يوم</span>
          </div>
          <Button variant="outline" size="icon" className="size-8 rounded-full">
            <Plus className="size-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="mt-4 h-[120px] w-full max-w-[352px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RTL_GOAL_CHART_DATA}>
              <Bar
                dataKey="goal"
                style={{ fill: "var(--color-chart-1)" }}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <DrawerFooter className="p-5">
        <Button className="w-full">إرسال</Button>
      </DrawerFooter>
    </StaticDrawerShell>
  )
}

function ResponsiveDialogPreview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-border bg-popover p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-1">
          <DrawerTitle className="text-popover-foreground">Share link</DrawerTitle>
          <button
            type="button"
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <DrawerDescription>
          Anyone who has this link will be able to view this.
        </DrawerDescription>
      </div>
      <FieldGroup className="gap-6">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input readOnly defaultValue="m@example.com" />
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input readOnly defaultValue="@shadcn" />
        </Field>
        <Button className="w-full">Save changes</Button>
      </FieldGroup>
    </div>
  )
}

export function DrawerDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Drawer</h1>
          <p className="text-base text-muted-foreground">A drawer component for React.</p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/drawer" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>
        <SpecSection title="Drawer Header">
          <HeaderAlignmentMatrix />
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Scrollable Content"
          description="Keep actions visible while the content scrolls."
        >
          <PreviewBox>
            <StaticDrawerShell className="rounded-bl-xl rounded-tl-xl">
              <MoveGoalHeader />
              <MoveGoalBody paragraphs={3} />
              <MoveGoalFooter />
            </StaticDrawerShell>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Sides"
          description={
            <>
              Use the <code className="text-sm">direction</code> prop to set the side of the drawer.
              Available options are <code className="text-sm">top</code>,{" "}
              <code className="text-sm">right</code>, <code className="text-sm">bottom</code>, and{" "}
              <code className="text-sm">left</code>.
            </>
          }
        >
          <div className="flex flex-col gap-10">
            <div>
              <p className="mb-4 text-lg font-semibold text-foreground">Top</p>
              <PreviewBox>
                <StaticDrawerShell
                  className="max-w-none rounded-b-xl"
                  surface="background"
                >
                  <MoveGoalHeader className="items-center text-center" />
                  <MoveGoalBody />
                  <MoveGoalFooter />
                </StaticDrawerShell>
              </PreviewBox>
            </div>
            <div>
              <p className="mb-4 text-lg font-semibold text-foreground">Bottom</p>
              <PreviewBox>
                <StaticDrawerShell
                  className="max-w-none rounded-t-xl"
                  showHandle
                  surface="background"
                >
                  <MoveGoalHeader className="items-center text-center" />
                  <MoveGoalBody />
                  <MoveGoalFooter />
                </StaticDrawerShell>
              </PreviewBox>
            </div>
            <PreviewBox>
              <div className="flex flex-wrap items-start justify-center gap-12">
                <div className="flex flex-col gap-12">
                  <p className="text-lg font-semibold text-foreground">Right</p>
                  <StaticDrawerShell className="rounded-bl-xl rounded-tl-xl">
                    <MoveGoalHeader />
                    <MoveGoalBody paragraphs={3} />
                    <MoveGoalFooter />
                  </StaticDrawerShell>
                </div>
                <div className="flex flex-col gap-12">
                  <p className="text-lg font-semibold text-foreground">Left</p>
                  <StaticDrawerShell className="rounded-br-xl rounded-tr-xl">
                    <MoveGoalHeader />
                    <MoveGoalBody paragraphs={3} />
                    <MoveGoalFooter />
                  </StaticDrawerShell>
                </div>
              </div>
            </PreviewBox>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Responsive Dialog"
          description="You can combine the Dialog and Drawer components to create a responsive dialog. This renders a Dialog component on desktop and a Drawer on mobile."
        >
          <PreviewBox>
            <ResponsiveDialogPreview />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="RTL"
          description={
            <>
              To enable RTL support in shadcn/ui, see the{" "}
              <a
                href="https://ui.shadcn.com/docs/rtl"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                RTL configuration guide
              </a>
              .
            </>
          }
        >
          <PreviewBox>
            <RtlMoveGoalPreview />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
