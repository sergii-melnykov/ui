/**
 * Storybook-only layout mirroring the Figma Aspect Ratio documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { cn } from "@/utils/index"

import { AspectRatio } from "./aspect-ratio"

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10">
      {children}
    </div>
  )
}

function ExampleIntro({
  title,
  description,
  className
}: {
  title: string
  description: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <h4 className="text-lg font-semibold leading-7 text-foreground">{title}</h4>
      <p className="pt-4 text-base leading-6 text-muted-foreground">{description}</p>
    </div>
  )
}

function RatioPlaceholder({ className }: { className?: string }) {
  return <div className={cn("size-full rounded-lg bg-muted", className)} aria-hidden />
}

export function AspectRatioDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex w-full gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Aspect Ratio</h1>
          <p className="text-base leading-6 text-muted-foreground">
            Displays content within a desired ratio.
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8 shrink-0 rounded-xl shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/aspect-ratio"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <div className="flex w-full flex-col">
        <h2 className="text-xl font-semibold leading-7 text-foreground">Examples</h2>
        <ExampleIntro
          className="pt-6"
          title="Square"
          description={
            <>
              A square aspect ratio component using the{" "}
              <code className="text-foreground">ratio={"{"}1 / 1{"}"}</code> prop. This is useful
              for displaying images in a square format.
            </>
          }
        />
      </div>

      <PreviewBox>
        <AspectRatio ratio={1 / 1} className="w-48">
          <RatioPlaceholder />
        </AspectRatio>
      </PreviewBox>

      <ExampleIntro
        title="Portrait"
        description={
          <>
            A portrait aspect ratio component using the{" "}
            <code className="text-foreground">ratio={"{"}9 / 16{"}"}</code> prop. This is useful for
            displaying images in a portrait format.
          </>
        }
      />

      <PreviewBox>
        <AspectRatio ratio={9 / 16} className="w-40">
          <RatioPlaceholder />
        </AspectRatio>
      </PreviewBox>

      <ExampleIntro
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
      />

      <PreviewBox>
        <div className="flex w-96 max-w-full flex-col items-start">
          <AspectRatio ratio={16 / 9} className="w-full">
            <RatioPlaceholder />
          </AspectRatio>
          <p
            dir="rtl"
            className="w-full pt-2 text-center text-sm leading-5 text-muted-foreground"
          >
            منظر طبيعي جميل
          </p>
        </div>
      </PreviewBox>
    </div>
  )
}
