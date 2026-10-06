"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { Button } from "@/components/atoms/button/button"
import { cn } from "@/utils/index"

export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 rounded-2xl border border-border bg-card text-sm text-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      orientation: {
        horizontal: "min-w-40 flex-row items-center",
        vertical: "w-[120px] flex-col items-start justify-center"
      },
      size: {
        default: "gap-2 p-2 has-data-[slot=attachment-content]:gap-2",
        sm: "gap-2 p-1.5 text-xs",
        xs: "gap-1.5 rounded-xl p-1 text-xs"
      }
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "default"
    }
  }
)

function Attachment({
  className,
  state = "done",
  orientation,
  size,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: AttachmentState
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-orientation={orientation}
      data-size={size}
      className={cn(attachmentVariants({ orientation, size, className }))}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:w-full group-data-[size=xs]/attachment:rounded-md [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: "size-10 group-data-[size=sm]/attachment:size-8 group-data-[size=xs]/attachment:size-7",
        image:
          "size-[102px] opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:size-full *:[img]:object-cover"
      },
      state: {
        default: "",
        destructive: "bg-destructive/10 text-destructive"
      },
      size: {
        default: "",
        sm: "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "size-7 [&_svg:not([class*='size-'])]:size-3.5"
      }
    },
    defaultVariants: {
      variant: "icon",
      state: "default",
      size: "default"
    }
  }
)

function AttachmentMedia({
  className,
  variant = "icon",
  size = "default",
  state = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant, size, state, className }))}
      {...props}
    />
  )
}

function AttachmentContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "flex min-w-0 max-w-full flex-1 flex-col justify-center leading-tight group-data-[orientation=vertical]/attachment:w-full",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block max-w-full min-w-0 truncate font-medium leading-5 group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        className
      )}
      {...props}
    />
  )
}

function AttachmentDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "mt-0.5 block min-w-0 max-w-full truncate pt-0 font-light leading-5 text-foreground group-data-[state=error]/attachment:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function AttachmentActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn("relative z-20 flex shrink-0 items-center justify-end", className)}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant,
  size = "icon-xs",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      type="button"
      variant={variant ?? "ghost"}
      size={size}
      className={cn("size-6", className)}
      {...props}
    />
  )
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        "scroll-fade-x flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-2 overflow-x-auto overscroll-x-contain py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden *:data-[slot=attachment]:w-64 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="attachment-trigger"
      type={asChild ? undefined : (type ?? "button")}
      className={cn("absolute inset-0 z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  attachmentVariants
}
