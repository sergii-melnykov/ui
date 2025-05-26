import * as React from "react"
import { type FieldValues, type FieldPath } from "react-hook-form"
import { RadioGroup } from "@/components/atoms/radio-group"

export interface RHFRadioButtonGroupOption {
  label: string
  id: string
  size?: "default" | "sm" | "lg"
}

export interface RHFRadioButtonGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<typeof RadioGroup>, "name"> {
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
  /** Optional aria-label for accessibility */
  "aria-label"?: string
  /** Optional aria-describedby for accessibility */
  "aria-describedby"?: string
  /** Radio button group options */
  options: RHFRadioButtonGroupOption[]
}
