import * as React from "react"
import { type FieldValues, type FieldPath } from "react-hook-form"
import { Input } from "@/components/atoms/input"

export interface RHFTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<typeof Input>, "name"> {
  /** The name of the field in the form */
  name: TName
  /** Optional label for the field */
  label?: string
  /** Optional description text below the field */
  description?: string
  /** Optional warning text to display */
  warningText?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** Whether the field is read-only */
  readOnly?: boolean
  /** The type of input (text, number, email, etc.) */
  type?: React.HTMLInputTypeAttribute
  /** Optional placeholder text */
  placeholder?: string
  /** Optional aria-label for accessibility */
  "aria-label"?: string
  /** Optional aria-describedby for accessibility */
  "aria-describedby"?: string
}
