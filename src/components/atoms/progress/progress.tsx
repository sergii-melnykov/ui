"use client"

import * as React from "react"
import { cn } from "@/utils/index"
import * as ProgressPrimitive from "@radix-ui/react-progress"

function Progress({
  className,
  value,
  dir,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const progress = value ?? 0

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      dir={dir}
      className={cn("relative h-1 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "block h-full bg-primary transition-all",
          dir === "rtl" && "ms-auto"
        )}
        style={{ width: `${String(progress)}%` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
