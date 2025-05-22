import * as React from "react"
import { cn } from "@/utils/index"
import { badgeVariants } from "./badge.variants"
import type { BadgeProps } from "./badge.types"

/**
 * Badge component for displaying status, counts, or labels.
 * Supports various variants, sizes, and optional icons.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-badge--docs
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" icon={<AlertIcon />}>Warning</Badge>
 * <Badge variant="info" size="lg" iconAfter={<ArrowIcon />}>New</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, iconAfter, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
        {iconAfter && <span className="ml-1">{iconAfter}</span>}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }
