import React from "react"
import type { BadgeSize, BadgeVariant } from "./badge.variants"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: BadgeSize
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
