/**
 * Storybook-only layout mirroring the Figma Collapsible documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  File,
  Maximize2
} from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Input } from "@/components/atoms/input/input"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/molecules/tabs/tabs"
import { cn } from "@/utils/index"

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
      <div className="pt-6">{children}</div>
    </div>
  )
}

function MatrixLabels({ rows }: { rows: string[] }) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6 pt-14">
      {rows.map((row) => (
        <div
          key={row}
          className={cn(
            "flex items-center gap-2.5",
            row === "Title-description" ? "h-14" : "h-9"
          )}
        >
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

function CollapsibleTriggerSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  const header = (
    <span
      className={cn(
        "flex-1 text-sm font-semibold text-foreground",
        dir === "rtl" && "text-right"
      )}
    >
      Header
    </span>
  )
  const icon = (
    <Button variant="ghost" size="icon" className="size-8 shrink-0" tabIndex={-1} type="button">
      <ChevronsUpDown className="size-4" aria-hidden />
    </Button>
  )

  return (
    <div dir={dir} className="flex h-8 w-full max-w-[183px] items-center justify-between px-4">
      {dir === "ltr" ? (
        <>
          {header}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {header}
        </>
      )}
    </div>
  )
}

function CollapsibleContentKeyValueSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  const label = <span className="shrink-0 text-sm text-muted-foreground">Label</span>
  const value = <span className="shrink-0 text-sm font-medium text-foreground">Value</span>

  return (
    <div
      dir={dir}
      className="flex w-full max-w-[366px] items-center justify-between rounded-md border border-border bg-background px-4 py-2"
    >
      {dir === "ltr" ? (
        <>
          {label}
          {value}
        </>
      ) : (
        <>
          {value}
          {label}
        </>
      )}
    </div>
  )
}

function CollapsibleContentTitleDescriptionSpec({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <div
      dir={dir}
      className={cn(
        "flex w-full max-w-[366px] flex-col gap-0 rounded-md border border-border bg-background px-4 py-2",
        dir === "rtl" && "items-end text-right"
      )}
    >
      <span className="w-full text-sm font-medium text-foreground">Value</span>
      <span className="w-full text-sm text-muted-foreground">Description</span>
    </div>
  )
}

function ProductDetailsCard({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <Card className="w-full max-w-sm gap-0 py-4 shadow-none sm:max-w-[384px]">
      <CardContent className="px-4">
        <div className={cn("rounded-md", defaultOpen && "bg-muted")}>
          <div className="flex h-8 w-full items-center justify-between rounded-full px-2.5 text-sm font-medium">
            Product details
            <ChevronDown className="size-4 shrink-0" aria-hidden />
          </div>
          {defaultOpen ? (
            <div className="flex flex-col gap-2 px-2.5 pb-2.5 pt-0">
              <p className="text-sm text-foreground">
                This panel can be expanded or collapsed to reveal additional content.
              </p>
              <Button size="sm" className="h-6 w-fit px-2 text-xs">
                Learn More
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

function RadiusField({ className }: { className?: string }) {
  return (
    <Input
      readOnly
      defaultValue="0"
      className={cn("h-8 w-[124px] text-sm font-medium shadow-none", className)}
    />
  )
}

function SettingsPanelCard({ expanded = false }: { expanded?: boolean }) {
  return (
    <Card className="w-full max-w-[320px] gap-4 py-3 shadow-none">
      <CardHeader className="gap-1 px-3 pb-0">
        <CardTitle className="text-base font-medium leading-6">Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-start px-2.5 pt-0">
        <div className="flex gap-2">
          {expanded ? (
            <div className="grid grid-cols-2 gap-2">
              <RadiusField />
              <RadiusField />
              <RadiusField />
              <RadiusField />
            </div>
          ) : (
            <>
              <RadiusField />
              <RadiusField />
            </>
          )}
          <Button variant="outline" size="icon" className="size-8 shrink-0" type="button">
            <Maximize2 className="size-4" aria-hidden />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const FILE_TREE_FOLDERS = ["components", "lib", "hooks", "types", "public"] as const
const FILE_TREE_FILES = [
  "app.tsx",
  "layout.tsx",
  "globals.css",
  "package.json",
  "tsconfig.json",
  "README.json",
  ".gitignore"
] as const

function FileTreeExample() {
  return (
    <Card className="w-[176px] gap-2 py-3 shadow-none">
      <CardHeader className="px-3 pb-0">
        <Tabs defaultValue="explorer">
          <TabsList className="h-auto w-full bg-muted p-[3px]">
            <TabsTrigger value="explorer" className="h-[25px] px-2.5 text-sm shadow-sm">
              Explorer
            </TabsTrigger>
            <TabsTrigger
              value="outline"
              className="h-[25px] px-2.5 text-sm text-muted-foreground shadow-none"
            >
              Outline
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 px-3 pt-0">
        {FILE_TREE_FOLDERS.map((name) => (
          <button
            key={name}
            type="button"
            className="flex h-7 items-center gap-1 rounded-sm px-2.5 text-xs font-medium leading-4 text-foreground"
          >
            <ChevronRight className="size-4 shrink-0" aria-hidden />
            {name}
          </button>
        ))}
        {FILE_TREE_FILES.map((name) => (
          <div
            key={name}
            className="flex h-7 items-center gap-1 rounded-sm px-2.5 text-xs font-medium leading-4 text-foreground"
          >
            <File className="size-4 shrink-0" aria-hidden />
            {name}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function RtlOrderPanel({ expanded = false }: { expanded?: boolean }) {
  const rows = expanded
    ? [
        { label: "الحالة", value: "تم الشحن", variant: "key-value" as const },
        {
          label: "100 Market St, San Francisco",
          value: "عنوان الشحن",
          variant: "title-description" as const
        },
        {
          label: "2x سماعات الاستوديو",
          value: "العناصر",
          variant: "title-description" as const
        }
      ]
    : [{ label: "الحالة", value: "تم الشحن", variant: "key-value" as const }]

  return (
    <div dir="rtl" className="flex w-full max-w-[350px] flex-col gap-2">
      <div className="flex h-8 items-center justify-between px-4">
        <Button variant="ghost" size="icon" className="size-8 shrink-0" type="button">
          <ChevronsUpDown className="size-4" aria-hidden />
        </Button>
        <span className="flex-1 text-right text-sm font-semibold text-foreground">الطلب #4189</span>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div
            key={row.value}
            className={cn(
              "rounded-md border border-border bg-background px-4 py-2",
              row.variant === "title-description"
                ? "flex flex-col items-end text-right"
                : "flex items-center justify-between"
            )}
          >
            {row.variant === "key-value" ? (
              <>
                <span className="text-sm font-medium text-foreground">{row.value}</span>
                <span className="text-sm text-muted-foreground">{row.label}</span>
              </>
            ) : (
              <>
                <span className="w-full text-sm font-medium text-foreground">{row.value}</span>
                <span className="w-full text-sm text-muted-foreground">{row.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function CollapsibleDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Collapsible</h1>
          <p className="text-base text-muted-foreground">
            An interactive component which expands/collapses a panel.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/collapsible"
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

        <SpecSection title="Collapsible">
          <VariantGrid className="flex-col">
            <ColumnHeaders />
            <div className="grid w-full grid-cols-2 gap-6">
              <CollapsibleTriggerSpec />
              <CollapsibleTriggerSpec dir="rtl" />
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Collapsible Content">
          <VariantGrid>
            <MatrixLabels rows={["Key-value", "Title-description"]} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6 gap-y-4">
                <CollapsibleContentKeyValueSpec />
                <CollapsibleContentKeyValueSpec dir="rtl" />
                <CollapsibleContentTitleDescriptionSpec />
                <CollapsibleContentTitleDescriptionSpec dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Basic">
          <PreviewBox>
            <div className="flex flex-wrap items-start justify-center gap-4">
              <ProductDetailsCard />
              <ProductDetailsCard defaultOpen />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Settings Panel"
          description="Use a trigger button to reveal additional settings."
        >
          <PreviewBox>
            <div className="flex flex-wrap items-start justify-center gap-4">
              <SettingsPanelCard />
              <SettingsPanelCard expanded />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="File Tree"
          description="Use nested collapsibles to build a file tree."
        >
          <PreviewBox>
            <FileTreeExample />
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
            <div className="flex flex-wrap items-start justify-center gap-4">
              <RtlOrderPanel />
              <RtlOrderPanel expanded />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
