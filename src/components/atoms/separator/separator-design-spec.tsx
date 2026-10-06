/**
 * Storybook-only layout mirroring the Figma Separator documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { cn } from "@/utils/index"

import { Separator } from "./separator"

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

function OrientationColumn({
  label,
  children,
  labelClassName
}: {
  label: string
  children: React.ReactNode
  labelClassName?: string
}) {
  return (
    <div className="flex w-[120px] flex-col items-center justify-center gap-6">
      <span
        className={cn(
          "text-sm font-medium whitespace-nowrap text-muted-foreground",
          labelClassName
        )}
      >
        {label}
      </span>
      <div className="h-3 w-full rounded-lg border-b border-foreground" aria-hidden />
      <div className="flex min-h-14 w-full items-center justify-center">{children}</div>
    </div>
  )
}

export function SeparatorDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Separator</h1>
          <p className="text-base text-muted-foreground">
            Visually or semantically separates content.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/docs/components/separator" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>

        <SpecSection title="Separator">
          <VariantGrid>
            <div className="flex gap-6">
              <OrientationColumn label="Vertical">
                <div className="flex h-[100px] items-center justify-center">
                  <Separator orientation="vertical" className="h-full" />
                </div>
              </OrientationColumn>
              <OrientationColumn label="Horizontal" labelClassName="text-center">
                <Separator className="w-[120px]" />
              </OrientationColumn>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Vertical"
          description={
            <>
              Use <code className="text-foreground">orientation=&quot;vertical&quot;</code> for a
              vertical separator.
            </>
          }
        >
          <PreviewBox>
            <div className="flex h-5 items-center gap-4 text-sm">
              <span>Blog</span>
              <Separator orientation="vertical" className="h-full" />
              <span>Docs</span>
              <Separator orientation="vertical" className="h-full" />
              <span>Source</span>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Menu"
          description="Vertical separators between menu items with descriptions."
        >
          <PreviewBox>
            <div className="flex items-stretch gap-4">
              <div className="flex w-[117px] flex-col gap-1">
                <span className="text-sm font-medium">Settings</span>
                <span className="text-xs text-muted-foreground">Manage preferences</span>
              </div>
              <Separator orientation="vertical" className="self-stretch" />
              <div className="flex w-[96px] flex-col gap-1">
                <span className="text-sm font-medium">Account</span>
                <span className="text-xs text-muted-foreground">Profile & security</span>
              </div>
              <Separator orientation="vertical" className="self-stretch" />
              <div className="flex w-[88px] flex-col gap-1">
                <span className="text-sm font-medium">Help</span>
                <span className="text-xs text-muted-foreground">Support & docs</span>
              </div>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="List" description="Horizontal separators between list items.">
          <PreviewBox>
            <div className="flex w-96 max-w-full flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Item 1</span>
                <span className="text-muted-foreground">Value 1</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Item 3</span>
                <span className="text-muted-foreground">Value 2</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Item 3</span>
                <span className="text-muted-foreground">Value 3</span>
              </div>
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
                className="underline underline-offset-4"
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
            <div dir="rtl" className="flex w-96 max-w-full flex-col gap-4">
              <div className="flex flex-col items-end gap-1 text-right">
                <span className="text-sm font-medium">shadcn/ui</span>
                <span className="text-xs text-muted-foreground">
                  الأساس لنظام التصميم الخاص بك
                </span>
              </div>
              <Separator />
              <p className="text-right text-sm text-foreground">
                مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.
              </p>
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
