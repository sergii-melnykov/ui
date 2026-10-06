/**
 * Storybook-only layout mirroring the Figma Skeleton documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Skeleton } from "./skeleton"

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

function ExampleBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      <div className="pt-6">{children}</div>
    </div>
  )
}

function PrimitiveRow({
  label,
  rowHeight,
  children
}: {
  label: string
  rowHeight: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex w-full items-center gap-2.5", rowHeight)}>
      <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">{label}</span>
      <div
        className="h-full w-3 shrink-0 rounded-bl-lg rounded-tl-lg border-l border-foreground"
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 items-center">{children}</div>
    </div>
  )
}

export function SkeletonDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Skeleton</h1>
          <p className="text-base text-muted-foreground">
            Use to show a placeholder while content is loading.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/skeleton"
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

        <SpecSection title="Skeleton">
          <VariantGrid className="flex-col flex-nowrap gap-6">
            <PrimitiveRow label="Avatar" rowHeight="h-10">
              <Skeleton className="size-10 shrink-0 rounded-full" />
            </PrimitiveRow>
            <PrimitiveRow label="Text" rowHeight="h-4">
              <Skeleton className="h-4 w-[290px] shrink-0 rounded-md" />
            </PrimitiveRow>
            <PrimitiveRow label="Card" rowHeight="h-[125px]">
              <Skeleton className="h-[125px] w-[290px] shrink-0 rounded-md" />
            </PrimitiveRow>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock title="Avatar">
          <PreviewBox>
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-[150px] rounded-md" />
                <Skeleton className="h-4 w-[100px] rounded-md" />
              </div>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Card">
          <PreviewBox>
            <div className="flex flex-col gap-4 rounded-xl border border-border bg-card py-4">
              <div className="flex flex-col gap-1 px-4">
                <Skeleton className="h-4 w-[192px] rounded-md" />
                <Skeleton className="h-4 w-[144px] rounded-md" />
              </div>
              <div className="px-4">
                <Skeleton className="h-[162px] w-72 rounded-md" />
              </div>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Text">
          <PreviewBox>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-80 rounded-md" />
              <Skeleton className="h-4 w-80 rounded-md" />
              <Skeleton className="h-4 w-60 rounded-md" />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Form">
          <PreviewBox>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-8 w-80 rounded-md" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-8 w-80 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Table">
          <PreviewBox>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex w-96 gap-4">
                  <Skeleton className="h-4 w-44 shrink-0 rounded-md" />
                  <Skeleton className="h-4 w-[90px] shrink-0 rounded-md" />
                  <Skeleton className="h-4 w-[86px] shrink-0 rounded-md" />
                </div>
              ))}
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Table">
          <PreviewBox>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="pb-2">
                  <Skeleton className="h-4 w-[250px] rounded-md" />
                </div>
                <Skeleton className="h-4 w-[200px] rounded-md" />
              </div>
              <Skeleton className="size-10 shrink-0 rounded-full" />
            </div>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
