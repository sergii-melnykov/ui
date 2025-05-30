import { type FieldValues, type FieldPath } from "react-hook-form"
import {
  type SelectOption as BaseSelectOption,
  SelectProps,
  type MultiSelectOption as BaseMultiSelectOption,
  MultiSelectProps
} from "@/components/atoms/select"

export type SelectOption = BaseSelectOption
export type MultiSelectOption = BaseMultiSelectOption

export interface RHFSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SelectProps, "name" | "value" | "onChange"> {
  /** The name of the field in the form */
  name: TName
  /** Optional label for the field */
  label?: string
  /** Optional description text below the field */
  description?: string
  /** Optional warning text to display */
  warningText?: string
  /** Whether the field is read-only */
  readOnly?: boolean
  /** Optional aria-label for accessibility */
  "aria-label"?: string
  /** Optional aria-describedby for accessibility */
  "aria-describedby"?: string
}

export interface RHFMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<MultiSelectProps, "name" | "value" | "onChange"> {
  /** The name of the field in the form */
  name: TName
  /** Optional label for the field */
  label?: string
  /** Optional description text below the field */
  description?: string
  /** Optional warning text to display */
  warningText?: string
  /** Whether the field is read-only */
  readOnly?: boolean
  /** Optional aria-label for accessibility */
  "aria-label"?: string
  /** Optional aria-describedby for accessibility */
  "aria-describedby"?: string
}
