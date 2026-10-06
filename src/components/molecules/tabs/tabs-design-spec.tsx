/**
 * Storybook-only layout mirroring the Figma Tabs documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { AppWindow, ArrowUpRight, CircleCheck, Code } from "lucide-react"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { tabsListVariants, tabsTriggerVariants, type TabsListVariant } from "./tabs.variants"

type TabPreviewState = "default" | "hover" | "focus" | "disabled"
type TabPreviewDir = "ltr" | "rtl"

const PREVIEW_STATES: TabPreviewState[] = ["default", "hover", "focus", "disabled"]

const MATRIX_COLUMNS = [
  { dir: "ltr" as const, selected: false },
  { dir: "ltr" as const, selected: true },
  { dir: "rtl" as const, selected: true },
  { dir: "rtl" as const, selected: false }
] as const

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
      {description ? (
        <p className="pt-4 text-base text-muted-foreground">{description}</p>
      ) : null}
      <div className={cn(description ? "pt-6" : "pt-4")}>{children}</div>
    </div>
  )
}

function VariantBlockLabel({ label }: { label: string }) {
  return (
    <div className="flex h-[172px] items-center gap-2.5">
      <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
      <div className="h-full w-3 border-l border-foreground" aria-hidden />
    </div>
  )
}

function StateRowLabel({ label }: { label: string }) {
  return (
    <div className="flex h-[25px] items-center gap-2.5">
      <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
      <div className="h-[25px] w-3 border-l border-foreground" aria-hidden />
    </div>
  )
}

function TabPreviewCell({
  listVariant,
  selected,
  state,
  dir
}: {
  listVariant: TabsListVariant
  selected: boolean
  state: TabPreviewState
  dir: TabPreviewDir
}) {
  const isActive = selected
  const mutedText = !isActive && state !== "hover"
  const mutedIcon = !isActive && state === "default"

  const stateClass =
    state === "hover"
      ? "text-foreground [&_svg]:text-foreground"
      : state === "focus"
        ? "border-ring bg-background text-foreground shadow-[0_0_0_3px] shadow-ring/50 [&_svg]:text-foreground"
        : state === "disabled"
          ? "opacity-50"
          : mutedText
            ? "text-muted-foreground [&_svg]:text-muted-foreground"
            : undefined

  const icon = (
    <CircleCheck
      className={cn("size-4", mutedIcon ? "text-muted-foreground" : "text-foreground")}
      aria-hidden
    />
  )
  const badge =
    isActive && listVariant === "default" ? (
      <Badge className="h-[22px] rounded-full px-2 text-xs">Default</Badge>
    ) : null

  return (
    <div dir={dir} className="group/tabs flex flex-col" data-orientation="horizontal">
      <div
        data-slot="tabs-list"
        data-variant={listVariant}
        className={cn(tabsListVariants({ variant: listVariant }))}
      >
        <div
          data-slot="tabs-trigger"
          data-state={isActive ? "active" : "inactive"}
          className={cn(tabsTriggerVariants(), stateClass)}
        >
          {dir === "rtl" ? (
            <>
              {badge}
              <span>Tab</span>
              {icon}
            </>
          ) : (
            <>
              {icon}
              <span>Tab</span>
              {badge}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function TabsComponentMatrix() {
  const variantBlocks: { label: string; listVariant: TabsListVariant }[] = [
    { label: "Default", listVariant: "default" },
    { label: "Underline", listVariant: "line" }
  ]

  return (
    <div className="flex min-w-[620px] gap-10">
      <div className="flex flex-col gap-6 pt-[76px]">
        {variantBlocks.map(({ label }) => (
          <div key={label} className="flex gap-6">
            <VariantBlockLabel label={label} />
            <div className="flex flex-col gap-6">
              {PREVIEW_STATES.map((state) => (
                <StateRowLabel
                  key={state}
                  label={state.charAt(0).toUpperCase() + state.slice(1)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="grid grid-cols-4 gap-6">
          {(["LTR", "LTR", "RTL", "RTL"] as const).map((group, index) => (
            <div
              key={`${group}-${String(index)}`}
              className="flex flex-col items-center gap-6"
            >
              <span className="text-sm font-medium text-muted-foreground">{group}</span>
              <div className="h-3 w-full border-b border-foreground" aria-hidden />
            </div>
          ))}
        </div>

        {variantBlocks.map(({ label, listVariant }) => (
          <div key={label} className="flex flex-col gap-6">
            {PREVIEW_STATES.map((state) => (
              <div key={state} className="grid grid-cols-4 items-center gap-6">
                {MATRIX_COLUMNS.map((column, columnIndex) => (
                  <div
                    key={`${state}-${String(columnIndex)}`}
                    className="flex justify-center"
                  >
                    <TabPreviewCell
                      listVariant={listVariant}
                      selected={column.selected}
                      state={state}
                      dir={column.dir}
                    />
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

export function TabsDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Tabs</h1>
          <p className="text-base text-muted-foreground">
            A set of layered sections of content—known as tab panels—that are displayed one at a
            time.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/radix/tabs"
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

        <SpecSection title="Tabs">
          <VariantGrid>
            <TabsComponentMatrix />
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Line"
          description={
            <>
              Use the <code>variant=&quot;line&quot;</code> prop on <code>TabsList</code> for a line
              style.
            </>
          }
        >
          <PreviewBox>
            <Tabs defaultValue="overview">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description={
            <>
              Use <code>orientation=&quot;vertical&quot;</code> for vertical tabs.
            </>
          }
        >
          <PreviewBox>
            <Tabs defaultValue="account" orientation="vertical" className="w-[104px]">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </Tabs>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Disabled" description={null}>
          <PreviewBox>
            <Tabs defaultValue="home">
              <TabsList>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Disabled
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Icons" description={null}>
          <PreviewBox>
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview">
                  <AppWindow aria-hidden />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code aria-hidden />
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
            <div dir="rtl" className="flex w-full max-w-sm flex-col items-end gap-2">
              <Tabs defaultValue="overview" dir="rtl">
                <TabsList>
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="analytics">التحليلات</TabsTrigger>
                  <TabsTrigger value="reports">التقارير</TabsTrigger>
                  <TabsTrigger value="settings">الإعدادات</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card className="w-[384px]">
                    <CardHeader className="items-end text-right">
                      <CardTitle>نظرة عامة</CardTitle>
                      <CardDescription>
                        عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر جميع مشاريعك
                        النشطة.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-right text-sm text-muted-foreground">
                      لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
