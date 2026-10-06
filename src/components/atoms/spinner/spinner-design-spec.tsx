/**
 * Storybook-only layout mirroring the Figma Spinner documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUp, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/atoms/empty/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "@/components/atoms/input-group/input-group"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/atoms/item/item"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import { Spinner } from "./spinner"

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
      {description ? <p className="pt-4 text-base text-muted-foreground">{description}</p> : null}
      <div className={cn(description ? "pt-6" : "pt-4")}>{children}</div>
    </div>
  )
}

function AnatomyColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
      <span className="text-sm font-medium whitespace-nowrap text-muted-foreground">{label}</span>
      <div className="h-3 w-full border-b border-foreground" aria-hidden />
      <div className="flex w-full items-center justify-center py-2">{children}</div>
    </div>
  )
}

const spinnerSizes = [
  { label: "size-3", className: "size-3" },
  { label: "size-4", className: "size-4" },
  { label: "size-5", className: "size-5" },
  { label: "size-6", className: "size-6" }
] as const

export function SpinnerDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Spinner</h1>
          <p className="text-base text-muted-foreground">
            An indicator that can be used to show a loading state.
          </p>
        </div>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl px-3 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/spinner"
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

        <SpecSection title="Spinner">
          <VariantGrid className="w-full">
            <div className="flex w-full gap-6">
              {spinnerSizes.map(({ label, className }) => (
                <AnatomyColumn key={label} label={label}>
                  <Spinner className={className} />
                </AnatomyColumn>
              ))}
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Customization"
          description="Use className to customize the color and size of the spinner."
        >
          <PreviewBox>
            <Spinner className="size-3 text-primary" />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Size"
          description="Use the size-* utility class to change the size of the spinner."
        >
          <PreviewBox>
            <div className="flex items-center gap-6">
              {spinnerSizes.map(({ className }) => (
                <Spinner key={className} className={className} />
              ))}
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Button"
          description={
            <>
              Add a spinner to a button to indicate a loading state. Remember to use the{" "}
              <code>data-icon=&quot;inline-start&quot;</code> prop to add the spinner to the start of
              the button and the <code>data-icon=&quot;inline-end&quot;</code> prop to add the
              spinner to the end of the button.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-col items-center gap-4">
              <Button size="sm" disabled>
                <Spinner data-icon="inline-start" />
                Loading
              </Button>
              <Button variant="outline" size="sm" disabled>
                <Spinner data-icon="inline-start" />
                Please wait
              </Button>
              <Button variant="secondary" size="sm" disabled>
                <Spinner data-icon="inline-start" />
                Processing
              </Button>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Badge"
          description={
            <>
              Add a spinner to a badge to indicate a loading state. Remember to use the{" "}
              <code>data-icon=&quot;inline-start&quot;</code> prop to add the spinner to the start of
              the badge and the <code>data-icon=&quot;inline-end&quot;</code> prop to add the spinner
              to the end of the badge.
            </>
          }
        >
          <PreviewBox>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge>
                <Spinner data-icon="inline-start" className="size-3" />
                Syncing
              </Badge>
              <Badge variant="secondary">
                <Spinner data-icon="inline-start" className="size-3" />
                Updating
              </Badge>
              <Badge variant="outline">
                <Spinner data-icon="inline-start" className="size-3" />
                Processing
              </Badge>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock title="Input Group">
          <div className="flex flex-col gap-6">
            <PreviewBox>
              <InputGroup data-disabled className="w-full max-w-md opacity-50">
                <InputGroupInput placeholder="Send a message" disabled />
                <InputGroupAddon align="inline-end">
                  <Spinner />
                </InputGroupAddon>
              </InputGroup>
            </PreviewBox>
            <PreviewBox>
              <InputGroup data-disabled className="w-full max-w-md opacity-50">
                <InputGroupTextarea placeholder="Send a message" disabled />
                <InputGroupAddon align="block-end" className="border-t border-border">
                  <Spinner />
                  <InputGroupText className="flex-1">Validating</InputGroupText>
                  <InputGroupButton variant="default" size="icon-xs" disabled aria-label="Send">
                    <ArrowUp />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </PreviewBox>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Empty">
          <PreviewBox>
            <Empty className="h-[216px] w-full max-w-sm gap-4 border border-solid p-6 md:p-6">
              <EmptyHeader className="max-w-sm gap-2">
                <EmptyMedia variant="icon" className="mb-0 size-8 [&_svg:not([class*='size-'])]:size-4">
                  <Spinner />
                </EmptyMedia>
                <EmptyTitle>Processing your request</EmptyTitle>
                <EmptyDescription>
                  Please wait while we process your request. Do not refresh the page.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="gap-4">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Cancel
                </Button>
              </EmptyContent>
            </Empty>
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
            <Item dir="rtl" variant="muted" className="w-full max-w-xs">
              <ItemContent>
                <ItemTitle className="w-full justify-end text-right">جاري معالجة الدفع...</ItemTitle>
              </ItemContent>
              <ItemMedia>
                <Spinner className="size-5" />
              </ItemMedia>
            </Item>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
