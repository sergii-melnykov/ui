import * as React from "react"
import { type FieldValues, type FieldPath } from "react-hook-form"
import { RadioGroup } from "@/components/atoms/radio-group"

export interface FormRadioGroupOption {
  label: string
  id: string
}

export interface FormRadioGroupWithChildrenProps<
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
  /** Children must be RadioGroupItem components */
  children: React.ReactNode
}

export interface FormRadioGroupWithOptionsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<typeof RadioGroup>, "name"> {
  /** The name of the field in the form */
  name: TName
  /** Optional label for the field */
  label?: string
  /** radio group options */
  options: FormRadioGroupOption[]
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
}

export type FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> =
  | FormRadioGroupWithChildrenProps<TFieldValues, TName>
  | FormRadioGroupWithOptionsProps<TFieldValues, TName>
