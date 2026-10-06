import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/utils/index"
import { badgeVariants } from "./badge.variants"
import type { BadgeProps } from "./badge.types"

/**
 * Badge component for displaying status, counts, or labels.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-badge--docs
 *
 * @example
 * ```tsx
 * <Badge variant="secondary">Published</Badge>
 * <Badge variant="outline">
 *   <BadgeCheck data-icon="inline-start" />
 *   Verified
 * </Badge>
 * <Badge asChild>
 *   <a href="https://example.com">Open link</a>
 * </Badge>
 * ```
 */
function Badge({ className, variant = "default", asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

Badge.displayName = "Badge"

export { Badge, badgeVariants }
