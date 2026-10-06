/**
 * Storybook-only layout mirroring the Figma Navigation Menu documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
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

function ColumnHeaders() {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {(["LTR", "RTL"] as const).map((label) => (
        <div key={label} className="flex flex-col items-center gap-6">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="h-3 w-full border-b border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function MatrixRowLabels({ states }: { states: readonly string[] }) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6 pt-14">
      {states.map((state) => (
        <div key={state} className="flex h-9 items-center gap-2.5">
          <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">
            {state}
          </span>
          <div className="h-full w-3 border-l border-foreground" aria-hidden />
        </div>
      ))}
    </div>
  )
}

function NavigationMenuTriggerSpec({
  dir = "ltr",
  focused = false
}: {
  dir?: "ltr" | "rtl"
  focused?: boolean
}) {
  const isRtl = dir === "rtl"

  return (
    <div dir={dir} className="flex h-9 w-full items-center justify-center">
      <StaticNavTrigger open={focused} chevronFirst={isRtl}>
        Menu item trigger
      </StaticNavTrigger>
    </div>
  )
}

function StaticNavTrigger({
  children,
  open,
  showChevron = true,
  chevronFirst = false
}: {
  children: React.ReactNode
  open?: boolean
  showChevron?: boolean
  chevronFirst?: boolean
}) {
  const chevron = showChevron ? (
    <ChevronDown
      className={cn("size-4 shrink-0 text-foreground", open && "rotate-180")}
      aria-hidden
    />
  ) : null

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1 rounded-lg px-2.5 text-sm font-medium text-foreground",
        open ? "bg-muted" : "bg-transparent"
      )}
    >
      {chevronFirst ? (
        <>
          {chevron}
          {children}
        </>
      ) : (
        <>
          {children}
          {chevron}
        </>
      )}
    </div>
  )
}

function StaticNavPanel({
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
      className={cn("rounded-lg border border-border bg-background p-1 text-sm", className)}
    >
      {children}
    </div>
  )
}

function StaticNavMenuItem({
  title,
  description,
  dir = "ltr"
}: {
  title: React.ReactNode
  description: React.ReactNode
  dir?: "ltr" | "rtl"
}) {
  const isRtl = dir === "rtl"

  return (
    <div
      dir={dir}
      className={cn(
        "flex flex-col gap-1 rounded-md px-4 py-2",
        isRtl && "items-end text-right"
      )}
    >
      <p className="w-full text-sm font-medium text-foreground">{title}</p>
      <p className="w-full text-sm leading-5 text-muted-foreground">{description}</p>
    </div>
  )
}

function LtrNavigationMenuExample() {
  return (
    <div className="flex items-start">
      <div className="flex flex-col gap-1">
        <StaticNavTrigger open>Getting started</StaticNavTrigger>
        <StaticNavPanel className="w-[392px]">
          <StaticNavMenuItem
            title="Introduction"
            description="Re-usable components built with Tailwind CSS."
          />
          <StaticNavMenuItem
            title="Installation"
            description="How to install dependencies and structure your app."
          />
          <StaticNavMenuItem
            title="Typography"
            description="Styles for headings, paragraphs, lists...etc"
          />
        </StaticNavPanel>
      </div>
      <StaticNavTrigger>Components</StaticNavTrigger>
      <StaticNavTrigger showChevron={false}>Docs</StaticNavTrigger>
    </div>
  )
}

function RtlNavigationMenuExample() {
  return (
    <div dir="rtl" className="flex items-start justify-end">
      <StaticNavTrigger chevronFirst>البدء</StaticNavTrigger>
      <div className="flex flex-col items-end gap-1">
        <StaticNavTrigger open chevronFirst>
          المكونات
        </StaticNavTrigger>
        <StaticNavPanel className="flex w-[555px] gap-2" dir="rtl">
          <div className="flex min-w-0 flex-1 flex-col">
            <StaticNavMenuItem
              dir="rtl"
              title="بطاقة التحويم"
              description="للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط."
            />
            <StaticNavMenuItem
              dir="rtl"
              title="منطقة التمرير"
              description="يفصل المحتوى بصريًا أو دلاليًا."
            />
            <StaticNavMenuItem
              dir="rtl"
              title="تلميح"
              description="نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على..."
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <StaticNavMenuItem
              dir="rtl"
              title="حوار التنبيه"
              description={
                <>
                  حوار نافذة يقطع المستخدم بمحتوى مهم
                  <br />
                  ويتوقع استجابة.
                </>
              }
            />
            <StaticNavMenuItem
              dir="rtl"
              title="التقدم"
              description={
                <>
                  يعرض مؤشرًا يوضح تقدم إتمام المهمة،
                  <br />
                  عادةً يتم عرضه كشريط تقدم.
                </>
              }
            />
            <StaticNavMenuItem
              dir="rtl"
              title="التبويبات"
              description={
                <>
                  مجموعة من أقسام المحتوى المتعددة
                  <br />
                  الطبقات—المعروفة بألواح التبويب—الت.
                </>
              }
            />
          </div>
        </StaticNavPanel>
      </div>
      <StaticNavTrigger showChevron={false}>الوثائق</StaticNavTrigger>
    </div>
  )
}

export function NavigationMenuDesignSpec() {
  const itemStates = ["Default", "Focus"] as const

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Navigation Menu</h1>
          <p className="text-base text-muted-foreground">
            A collection of links for navigating websites.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/navigation-menu"
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

        <SpecSection title="Navigation Menu">
          <VariantGrid className="flex-nowrap gap-4 overflow-x-auto">
            <MatrixRowLabels states={itemStates} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <ColumnHeaders />
              <div className="grid grid-cols-2 gap-6">
                {itemStates.flatMap((state) => [
                  <NavigationMenuTriggerSpec
                    key={`${state}-ltr`}
                    dir="ltr"
                    focused={state === "Focus"}
                  />,
                  <NavigationMenuTriggerSpec
                    key={`${state}-rtl`}
                    dir="rtl"
                    focused={state === "Focus"}
                  />
                ])}
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <PreviewBox>
          <LtrNavigationMenuExample />
        </PreviewBox>

        <div className="flex w-full flex-col">
          <h4 className="text-lg font-semibold text-foreground">RTL</h4>
          <p className="pt-4 text-base text-muted-foreground">
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
          </p>
          <div className="pt-6">
            <PreviewBox>
              <RtlNavigationMenuExample />
            </PreviewBox>
          </div>
        </div>
      </div>
    </div>
  )
}
