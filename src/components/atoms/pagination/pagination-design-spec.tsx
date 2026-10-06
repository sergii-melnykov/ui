/**
 * Storybook-only layout mirroring the Figma Pagination documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, ChevronRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Label } from "@/components/atoms/label/label"
import {
  NativeSelect,
  NativeSelectOption
} from "@/components/atoms/native-select/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./pagination"

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

function SimplePaginationExample() {
  return (
    <Pagination>
      <PaginationContent>
        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === 2}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}

function IconsOnlyPaginationExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="rows-per-page-icons">Rows per page</Label>
        <NativeSelect id="rows-per-page-icons" size="sm" className="w-20 rounded-lg" defaultValue="25">
          <NativeSelectOption value="10">10</NativeSelectOption>
          <NativeSelectOption value="25">25</NativeSelectOption>
          <NativeSelectOption value="50">50</NativeSelectOption>
        </NativeSelect>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" showIcon={false} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function RtlPaginationExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationNext href="#" showIcon={false}>
            التالي
          </PaginationNext>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">٣</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            ٢
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">١</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label="Go to previous page"
            className="h-8 gap-1 rounded-full px-2.5"
          >
            <span>السابق</span>
            <ChevronRight className="size-4" aria-hidden />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function PaginationDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Pagination</h1>
          <p className="text-base text-muted-foreground">
            Pagination with page navigation, next and previous links.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/pagination"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Simple"
          description="A simple pagination with only page numbers."
        >
          <PreviewBox>
            <SimplePaginationExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Icons Only"
          description="Use just the previous and next buttons without page numbers. This is useful for data tables with a rows per page selector."
        >
          <PreviewBox>
            <IconsOnlyPaginationExample />
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
            <RtlPaginationExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
