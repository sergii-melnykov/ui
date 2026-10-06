"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

const bubbleVariants = cva(
  "relative flex max-w-md shrink-0 flex-col items-start justify-center rounded-3xl px-3 py-2.5 text-sm leading-5",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-secondary text-muted-foreground",
        tinted: "bg-primary/15 text-foreground",
        outline: "border border-border bg-transparent text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        /** @deprecated Use `tinted` instead */
        ghost: "bg-primary/15 text-foreground"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

const bubbleReactionsVariants = cva("relative z-10 flex w-full", {
  variants: {
    side: {
      bottom: "-mt-1",
      top: "-mb-1 order-first"
    },
    align: {
      start: "justify-start pl-3.5",
      end: "justify-end pr-3.5"
    }
  },
  defaultVariants: {
    side: "bottom",
    align: "start"
  }
})

type BubbleProps = React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }

function Bubble({ className, variant, align = "start", ...props }: BubbleProps) {
  const bubble = (
    <div
      data-slot="bubble"
      data-variant={variant}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )

  return (
    <div
      data-slot="bubble-align"
      data-align={align}
      className={cn(
        "flex w-full",
        align === "end" ? "justify-end" : "justify-start"
      )}
    >
      {bubble}
    </div>
  )
}

function BubbleContent({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="bubble-content"
      className={cn("break-words whitespace-pre-wrap", className)}
      {...props}
    />
  )
}

function BubbleFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-footer"
      className={cn("flex h-8 items-center gap-1 pr-2.5", className)}
      {...props}
    />
  )
}

function BubbleReaction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-reaction"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border-[3px] border-card bg-muted px-1.5 py-0.5 text-sm text-foreground",
        className
      )}
      {...props}
    />
  )
}

function BubbleReactions({
  className,
  side,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bubbleReactionsVariants>) {
  return (
    <div
      data-slot="bubble-reactions"
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

export {
  Bubble,
  BubbleContent,
  BubbleFooter,
  BubbleGroup,
  BubbleReaction,
  BubbleReactions,
  bubbleReactionsVariants,
  bubbleVariants
}
