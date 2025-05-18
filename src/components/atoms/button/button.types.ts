import * as React from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
export type ButtonSize = "default" | "sm" | "lg" | "icon"

/**
 * Props interface for the Button component.
 * Extends the native button HTML attributes and adds support for variants and asChild prop.
 * Implements proper accessibility features and follows WCAG 2.1 Level AA guidelines.
 *
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 * @extends {VariantProps<typeof buttonVariants>}
 *
 * @property {boolean} [asChild] - When true, renders the button as a child component using Radix UI's Slot.
 * @property {ButtonVariant} [variant] - The visual style variant of the button.
 * @property {ButtonSize} [size] - The size variant of the button.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 * @property {React.ReactNode} [startIcon] - Icon to display before the button text.
 * @property {React.ReactNode} [endIcon] - Icon to display after the button text.
 * @property {boolean} [loading] - Whether the button is in a loading state.
 * @property {string} [type] - The type of button (button, submit, reset). Defaults to "button".
 * @property {string} [aria-label] - Accessible label for the button. Falls back to button text if not provided.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
  type?: "button" | "submit" | "reset"
  "aria-label"?: string
}
