import { VariantProps } from "class-variance-authority"
import { typographyVariants } from "./typography"

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>
export type TypographyAlign = NonNullable<VariantProps<typeof typographyVariants>["align"]>
