/**
 * Card groups related content and actions with a consistent bordered surface.
 */
import * as React from "react"

import { cn } from "@/utils"

import {
  type CardActionProps,
  type CardContentProps,
  type CardDescriptionProps,
  type CardFooterProps,
  type CardHeaderProps,
  type CardProps,
  type CardTitleProps
} from "./card.types"
import { cardVariants } from "./card.variants"

export { cardVariants }

/**
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-card--docs
 */
function Card({ className, size, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size ?? "default"}
      className={cn(cardVariants({ size }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "rtl:has-data-[slot=card-action]:grid-cols-[auto_1fr]",
        "[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base font-medium leading-6 tracking-normal rtl:col-start-2 rtl:text-right",
        "group-data-[size=sm]/card:text-sm group-data-[size=sm]/card:leading-5",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm font-normal leading-5 text-muted-foreground rtl:col-start-2 rtl:text-right",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        "rtl:col-start-1 rtl:justify-self-start",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: CardContentProps) {
  return <div data-slot="card-content" className={cn("px-4", className)} {...props} />
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex flex-col gap-2 border-t border-border bg-muted p-4",
        "rounded-b-xl [.border-t]:pt-4",
        "group-data-[size=sm]/card:gap-2 group-data-[size=sm]/card:p-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
}
