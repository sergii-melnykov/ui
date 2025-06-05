import React from "react"
import { VariantProps } from "class-variance-authority"
import { badgeVariants } from "./badge.variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The content to display inside the badge
   */
  children: React.ReactNode
  /**
   * Optional icon to display before the badge content
   */
  icon?: React.ReactNode
  /**
   * Optional icon to display after the badge content
   */
  iconAfter?: React.ReactNode
}
