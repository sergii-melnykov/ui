/**
 * Storybook-only layout mirroring the Figma Badge documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, BadgeCheck, Bookmark, Loader2 } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Badge } from "./badge"
import type { BadgeVariant } from "./badge.variants"

const BADGE_VARIANT_ROWS: { label: string; variant: BadgeVariant }[] = [
  { label: "Default", variant: "default" },
  { label: "Secondary", variant: "secondary" },
  { label: "Destructive", variant: "destructive" },
  { label: "Outline", variant: "outline" },
  { label: "Ghost", variant: "ghost" }
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

export function BadgeDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Badge</h1>
          <p className="text-base text-muted-foreground">
            Displays a badge or a component that looks like a badge.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/badge" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Badge">
          <VariantGrid>
            <div className="flex flex-col gap-6">
              {BADGE_VARIANT_ROWS.map(({ label, variant }) => (
                <div key={variant} className="flex h-[22px] items-center gap-2.5">
                  <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">
                    {label}
                  </span>
                  <div
                    className="h-full w-3 rounded-bl-lg rounded-tl-lg border-l border-foreground"
                    aria-hidden
                  />
                  <Badge variant={variant}>{label}</Badge>
                </div>
              ))}
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="With Icon"
          description={
            <>
              You can render an icon inside the badge. Use{" "}
              <code>data-icon=&quot;inline-start&quot;</code> to render the icon on the left and{" "}
              <code>data-icon=&quot;inline-end&quot;</code> to render the icon on the right.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">
                <BadgeCheck data-icon="inline-start" />
                Verified
              </Badge>
              <Badge variant="outline">
                Bookmark
                <Bookmark data-icon="inline-end" />
              </Badge>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="With Spinner"
          description={
            <>
              You can render a spinner inside the badge. Remember to add the{" "}
              <code>data-icon=&quot;inline-start&quot;</code> or{" "}
              <code>data-icon=&quot;inline-end&quot;</code> prop to the spinner.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="destructive">
                <Loader2 className="animate-spin" data-icon="inline-start" />
                Deleting
              </Badge>
              <Badge variant="secondary">
                Generating
                <Loader2 className="animate-spin" data-icon="inline-end" />
              </Badge>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Link"
          description={<>Use the asChild prop to render a link as a badge.</>}
        >
          <PreviewBox>
            <Badge asChild>
              <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
                Open link
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Badge>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Colors"
          description={
            <>
              You can customize the colors of a badge by adding custom classes such as{" "}
              <code>bg-green-50 dark:bg-green-800</code> to the Badge component.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge className="border-transparent bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                Blue
              </Badge>
              <Badge className="border-transparent bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                Green
              </Badge>
              <Badge className="border-transparent bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                Sky
              </Badge>
              <Badge className="border-transparent bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                Purple
              </Badge>
              <Badge className="border-transparent bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                Red
              </Badge>
            </div>
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
            <div dir="rtl" className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline">إشارة مرجعية</Badge>
              <Badge variant="secondary">
                متحقق
                <BadgeCheck data-icon="inline-end" />
              </Badge>
              <Badge variant="outline">مخطط</Badge>
              <Badge variant="destructive">مدمر</Badge>
              <Badge variant="secondary">ثانوي</Badge>
              <Badge variant="default">شارة</Badge>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
