import * as React from "react"

import { cn } from "@/utils"
import type { TypographyProps } from "./typography.types"
import { typographyDefaultElement, typographyVariants } from "./typography.variants"

/**
 * Typography styles aligned with [shadcn/ui typography examples](https://ui.shadcn.com/docs/components/typography).
 * Each variant maps to a semantic HTML element by default; use `as` to override.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-typography--docs
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Page title</Typography>
 * <Typography variant="list">
 *   <li>First item</li>
 * </Typography>
 * <Typography variant="inline-code">npm install</Typography>
 * ```
 */
function Typography({
  ref,
  className,
  variant = "p",
  align,
  as,
  ...props
}: TypographyProps) {
  const resolvedVariant = variant ?? "p"
  const Component = as ?? typographyDefaultElement[resolvedVariant]

  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant: resolvedVariant, align }), className)}
      {...props}
    />
  )
}

Typography.displayName = "Typography"

export { Typography, typographyVariants }
