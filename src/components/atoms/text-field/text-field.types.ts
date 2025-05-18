import * as React from "react"
import { VariantProps } from "class-variance-authority"
import { textFieldVariants } from "./text-field"

/**
 * Props interface for the TextField component.
 * Extends the native input HTML attributes and adds support for variants and icons.
 *
 * @interface TextFieldProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @extends {VariantProps<typeof textFieldVariants>}
 *
 * @property {string} [variant] - The visual style variant of the text field.
 * @property {string} [size] - The size variant of the text field.
 * @property {string} [className] - Additional CSS classes to apply to the text field.
 * @property {React.ReactNode} [startIcon] - Icon to display before the input.
 * @property {React.ReactNode} [endIcon] - Icon to display after the input.
 * @property {boolean} [loading] - Whether the text field is in a loading state.
 * @property {string} [error] - Error message to display below the text field.
 * @property {string} [label] - Label text for the text field.
 * @property {string} [helperText] - Helper text to display below the text field.
 */
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textFieldVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
  error?: string
  label?: string
  helperText?: string
}
