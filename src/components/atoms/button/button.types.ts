import * as React from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"

/**
 * Props interface for the Button component.
 * Extends the native button HTML attributes and adds support for variants and asChild prop.
 *
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 * @extends {VariantProps<typeof buttonVariants>}
 *
 * @property {boolean} [asChild] - When true, renders the button as a child component using Radix UI's Slot.
 * @property {string} [variant] - The visual style variant of the button.
 * @property {string} [size] - The size variant of the button.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
