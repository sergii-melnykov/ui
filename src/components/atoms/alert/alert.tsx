import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

const alertVariants = cva(
  [
    "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-2.5 py-2 text-sm",
    "has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-2",
    "has-[>[data-slot=alert-action]]:grid-cols-[1fr_auto] has-[>[data-slot=alert-action]]:items-center",
    "has-[>svg]:has-[>[data-slot=alert-action]]:grid-cols-[calc(var(--spacing)*4)_1fr_auto]",
    "[&>[data-slot=alert-title]]:col-start-2 [&>[data-slot=alert-description]]:col-start-2",
    "has-[>[data-slot=alert-action]]:[&>[data-slot=alert-title]]:col-start-1",
    "has-[>[data-slot=alert-action]]:[&>[data-slot=alert-description]]:col-start-1",
    "has-[>svg]:has-[>[data-slot=alert-action]]:[&>[data-slot=alert-title]]:col-start-2",
    "has-[>svg]:has-[>[data-slot=alert-action]]:[&>[data-slot=alert-description]]:col-start-2",
    "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:row-span-2 [&>svg]:text-current",
    "has-[>svg]:[&>[data-slot=alert-action]]:col-start-3",
    "has-[>svg]:has-[>[data-slot=alert-action]]:[&>svg]:translate-y-0",
    "has-[>[data-slot=alert-action]]:[&>[data-slot=alert-title]]:min-h-0",
    "has-[>[data-slot=alert-action]]:[&>[data-slot=alert-description]]:min-h-0"
  ],
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive [&>svg]:text-current"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "min-h-4 text-sm font-medium leading-5 tracking-normal [[dir=rtl]_&]:text-right",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm font-light leading-5 text-inherit [&_p]:leading-5 [[dir=rtl]_&]:text-right",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("col-start-2 row-span-2 flex items-center self-center", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
