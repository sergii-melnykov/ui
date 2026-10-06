/**
 * Storybook-only layout mirroring the Figma Breadcrumb documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/organisms/dropdown-menu"
import { cn } from "@/utils/index"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "./breadcrumb"

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

function BreadcrumbItemSpec({
  active = false,
  dir = "ltr",
  withIcon = true
}: {
  active?: boolean
  dir?: "ltr" | "rtl"
  withIcon?: boolean
}) {
  const label = (
    <span
      className={cn(
        "whitespace-nowrap text-sm",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      Home
    </span>
  )
  const icon = withIcon ? (
    <ChevronDown
      className={cn("size-3.5 shrink-0", active ? "text-foreground" : "text-muted-foreground")}
      aria-hidden
    />
  ) : null

  return (
    <div dir={dir} className="inline-flex items-center gap-1">
      {dir === "rtl" ? (
        <>
          {icon}
          {label}
        </>
      ) : (
        <>
          {label}
          {icon}
        </>
      )}
    </div>
  )
}

function BasicBreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function DotSeparatorBreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator variant="dot" />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator variant="dot" />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function DropdownBreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator variant="dot" />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground">
              Components
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator variant="dot" />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function CollapsedBreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function RtlBreadcrumbExample() {
  return (
    <Breadcrumb dir="rtl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator variant="dot" />
        <BreadcrumbItem>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <ChevronDown className="size-3.5" aria-hidden />
            المكونات
          </span>
        </BreadcrumbItem>
        <BreadcrumbSeparator variant="dot" />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">الرئيسية</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function BreadcrumbDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Breadcrumb</h1>
          <p className="text-base text-muted-foreground">
            Displays the path to the current resource using a hierarchy of links.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/breadcrumb"
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

        <SpecSection title="Breadcrumb Item">
          <VariantGrid>
            <div className="flex min-w-[280px] flex-1 flex-col gap-4 pt-14">
              <div className="flex items-center gap-2.5">
                <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">
                  Default
                </span>
                <div className="h-8 w-3 border-l border-foreground" aria-hidden />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-[78px] shrink-0 text-sm font-medium text-muted-foreground">
                  Hover/Active
                </span>
                <div className="h-8 w-3 border-l border-foreground" aria-hidden />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2.5">
                  <span className="text-sm font-medium text-muted-foreground">LTR</span>
                  <div className="h-3 w-full border-b border-foreground" aria-hidden />
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <span className="text-sm font-medium text-muted-foreground">RTL</span>
                  <div className="h-3 w-full border-b border-foreground" aria-hidden />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <BreadcrumbItemSpec />
                <BreadcrumbItemSpec dir="rtl" />
                <BreadcrumbItemSpec active />
                <BreadcrumbItemSpec active dir="rtl" />
              </div>
            </div>
          </VariantGrid>
        </SpecSection>

        <SpecSection title="Breadcrumb Separator">
          <VariantGrid>
            <div className="grid w-full min-w-[280px] flex-1 grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2.5">
                <span className="text-sm font-medium text-muted-foreground">Chevron</span>
                <div className="h-3 w-full border-b border-foreground" aria-hidden />
                <ol className="flex list-none items-center p-0">
                  <BreadcrumbSeparator />
                </ol>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <span className="text-sm font-medium text-muted-foreground">Dot</span>
                <div className="h-3 w-full border-b border-foreground" aria-hidden />
                <ol className="flex list-none items-center p-0">
                  <BreadcrumbSeparator variant="dot" />
                </ol>
              </div>
            </div>
          </VariantGrid>
        </SpecSection>
      </div>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Basic"
          description="A basic breadcrumb with a home link and a components link."
        >
          <PreviewBox>
            <BasicBreadcrumbExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Custom separator"
          description={
            <>
              Use a custom component as children for <code>&lt;BreadcrumbSeparator /&gt;</code> to
              create a custom separator, or use the <code>variant=&quot;dot&quot;</code> prop.
            </>
          }
        >
          <PreviewBox>
            <DotSeparatorBreadcrumbExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Dropdown"
          description={
            <>
              You can compose <code>&lt;BreadcrumbItem /&gt;</code> with a{" "}
              <code>&lt;DropdownMenu /&gt;</code> to create a dropdown in the breadcrumb.
            </>
          }
        >
          <PreviewBox>
            <DropdownBreadcrumbExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Collapsed"
          description={
            <>
              We provide a <code>&lt;BreadcrumbEllipsis /&gt;</code> component to show a collapsed
              state when the breadcrumb is too long.
            </>
          }
        >
          <PreviewBox>
            <CollapsedBreadcrumbExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Link component"
          description={
            <>
              To use a custom link component from your routing library, you can use the{" "}
              <code>asChild</code> prop on <code>&lt;BreadcrumbLink /&gt;</code>.
            </>
          }
        >
          <PreviewBox>
            <BasicBreadcrumbExample />
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
            <RtlBreadcrumbExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
