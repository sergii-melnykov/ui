import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import type { cardVariants } from "./card.variants"

/**
 * Props for the Card component (native div HTML attributes).
 */
export type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>

/**
 * Props for the CardHeader component.
 */
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Props for the CardTitle component.
 */
export type CardTitleProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Props for the CardDescription component.
 */
export type CardDescriptionProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Props for the CardAction component.
 */
export type CardActionProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Props for the CardContent component.
 */
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Props for the CardFooter component.
 */
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>
