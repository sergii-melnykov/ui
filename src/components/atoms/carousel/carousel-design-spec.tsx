/**
 * Storybook-only layout mirroring the Figma Carousel documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Separator } from "@/components/atoms/separator/separator"
import { cn } from "@/utils/index"

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "./carousel"

const INLINE_NAV =
  "static top-auto left-auto shrink-0 translate-x-0 translate-y-0 rounded-full disabled:opacity-50"

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

function CarouselSlideCard({
  children,
  layout = "vertical",
  className
}: {
  children: React.ReactNode
  layout?: "vertical" | "horizontal" | "horizontal-slide"
  className?: string
}) {
  if (layout === "horizontal") {
    return (
      <div
        className={cn(
          "flex w-[211px] items-center justify-center rounded-xl border bg-card py-4",
          className
        )}
      >
        <div className="flex flex-1 items-center justify-center p-6">{children}</div>
      </div>
    )
  }

  const isVerticalSlide = layout === "vertical"

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border bg-card p-1",
        isVerticalSlide ? "h-[165px] w-[125px]" : "w-full min-w-0",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-1 items-center justify-center rounded-xl border bg-card py-4",
          isVerticalSlide ? "h-[157px] w-[117px]" : "min-h-[72px] w-full"
        )}
      >
        <div className="flex flex-1 items-center justify-center p-6">{children}</div>
      </div>
    </div>
  )
}

function SlideNumber({
  children,
  layout = "vertical"
}: {
  children: React.ReactNode
  layout?: "vertical" | "horizontal"
}) {
  return (
    <span
      className={cn(
        "text-center font-semibold text-card-foreground",
        layout === "vertical" ? "text-2xl leading-8" : "text-3xl leading-9"
      )}
    >
      {children}
    </span>
  )
}

function InlineCarousel({
  children,
  className,
  contentClassName,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Carousel> & { contentClassName?: string }) {
  return (
    <Carousel
      orientation={orientation}
      className={cn("flex w-full items-center justify-center", className)}
      {...props}
    >
      <CarouselPrevious
        size="icon-sm"
        className={cn(INLINE_NAV, orientation === "vertical" && "hidden")}
      />
      <CarouselContent className={contentClassName}>{children}</CarouselContent>
      <CarouselNext
        size="icon-sm"
        className={cn(INLINE_NAV, orientation === "vertical" && "hidden")}
      />
    </Carousel>
  )
}

function CarouselApiExample() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
    }

    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <Carousel setApi={setApi} className="flex flex-col items-center">
      <div className="flex items-center">
        <CarouselPrevious size="icon-sm" className={cn(INLINE_NAV, "mr-4")} />
        <CarouselContent className="-ml-4">
          {Array.from({ length: 5 }, (_, index) => (
            <CarouselItem key={index} className="basis-auto pl-4">
              <div className="flex items-center p-px">
                <div className="flex h-[350px] w-[318px] items-center justify-center rounded-xl border bg-card py-4">
                  <span className="text-4xl font-semibold leading-10 text-card-foreground">
                    {index + 1}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext size="icon-sm" className={cn(INLINE_NAV, "ml-4")} />
      </div>
      <p className="py-4 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </p>
    </Carousel>
  )
}

function VerticalCarouselExample() {
  return (
    <Carousel orientation="vertical" className="flex w-[320px] flex-col items-center">
      <CarouselPrevious size="icon-sm" className={cn(INLINE_NAV, "mb-4 rotate-0")}>
        <ArrowUp />
      </CarouselPrevious>
      <CarouselContent className="-mt-1 flex-col">
        {[1, 2].map((num) => (
          <CarouselItem key={num} className="basis-auto pt-1">
            <CarouselSlideCard layout="horizontal-slide">
              <SlideNumber layout="horizontal">{num}</SlideNumber>
            </CarouselSlideCard>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext size="icon-sm" className={cn(INLINE_NAV, "mt-4 rotate-0")}>
        <ArrowDown />
      </CarouselNext>
    </Carousel>
  )
}

export function CarouselDesignSpec() {
  const slides = [1, 2, 3]

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Carousel</h1>
          <p className="text-base text-muted-foreground">
            A carousel with motion and swipe built using Embla.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/carousel"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </header>

      <section className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Card</h2>
        <div className="flex flex-wrap gap-4 rounded-xl border border-dashed border-border p-5">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="flex w-[117px] flex-col items-center gap-2.5">
                <span className="text-sm font-medium text-muted-foreground">Vertical</span>
                <div className="h-3 w-full rounded-lg border-b border-foreground" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5">
                <span className="text-sm font-medium text-muted-foreground">Horizontal</span>
                <div className="h-3 w-full rounded-lg border-b border-foreground" />
              </div>
            </div>
            <div className="flex gap-6">
              <CarouselSlideCard layout="vertical">
                <SlideNumber>1</SlideNumber>
              </CarouselSlideCard>
              <CarouselSlideCard layout="horizontal">
                <SlideNumber layout="horizontal">1</SlideNumber>
              </CarouselSlideCard>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Sizes"
          description={
            <>
              To set the size of the items, you can use the <code>basis</code> utility class on the{" "}
              <code>&lt;CarouselItem /&gt;</code>.
            </>
          }
        >
          <PreviewBox>
            <InlineCarousel opts={{ align: "start" }}>
              {slides.map((num) => (
                <CarouselItem key={num} className="basis-auto pl-4">
                  <CarouselSlideCard layout="vertical">
                    <SlideNumber>{num}</SlideNumber>
                  </CarouselSlideCard>
                </CarouselItem>
              ))}
            </InlineCarousel>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Spacing"
          description={
            <>
              To set the spacing between the items, we use a <code>pl-[VALUE]</code> utility on the{" "}
              <code>&lt;CarouselItem /&gt;</code> and a negative <code>-ml-[VALUE]</code> on the{" "}
              <code>&lt;CarouselContent /&gt;</code>.
            </>
          }
        >
          <PreviewBox>
            <Carousel opts={{ align: "start" }} className="flex items-center">
              <CarouselPrevious size="icon-sm" className={cn(INLINE_NAV, "mr-4")} />
              <CarouselContent className="-ml-1">
                {slides.map((num) => (
                  <CarouselItem key={num} className="basis-auto pl-1">
                    <CarouselSlideCard layout="vertical">
                      <SlideNumber>{num}</SlideNumber>
                    </CarouselSlideCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext size="icon-sm" className={cn(INLINE_NAV, "ml-4")} />
            </Carousel>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Orientation"
          description="Use the orientation prop to set the orientation of the carousel."
        >
          <PreviewBox>
            <VerticalCarouselExample />
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="API"
          description="Use a state and the setApi props to get an instance of the carousel API."
        >
          <PreviewBox>
            <CarouselApiExample />
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
