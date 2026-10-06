import type * as React from "react"
import type { VariantProps } from "class-variance-authority"

import type { typographyVariants } from "./typography.variants"

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>
export type TypographyAlign = NonNullable<VariantProps<typeof typographyVariants>["align"]>

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  ref?: React.Ref<HTMLElement>
  /** Overrides the default semantic element for the variant. */
  as?: React.ElementType
}
