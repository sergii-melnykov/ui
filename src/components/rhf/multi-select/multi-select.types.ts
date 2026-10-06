import { type FieldValues, type FieldPath } from "react-hook-form"

import {
  type MultiSelectOptionsControlOption,
  type MultiSelectOptionsControlProps
} from "./multi-select-options-control"

export type FormMultiSelectOption = MultiSelectOptionsControlOption

export interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<MultiSelectOptionsControlProps, "value" | "onChange"> {
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
