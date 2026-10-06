import type { FieldPath, FieldValues } from "react-hook-form"

import type {
  DatePickerButtonProps,
  DatePickerRangeButtonProps
} from "@/components/atoms/date-picker/date-picker.types"

type DatePickerButtonPassthrough = Omit<
  DatePickerButtonProps,
  "date" | "disabled" | "aria-invalid" | "aria-required"
>

type DatePickerRangeButtonPassthrough = Omit<
  DatePickerRangeButtonProps,
  "range" | "disabled" | "aria-invalid" | "aria-required"
>

export interface FormDatePickerBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  label?: string
  description?: string
  warningText?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  "aria-label"?: string
  "aria-describedby"?: string
  className?: string
}

export type FormDatePickerSingleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormDatePickerBaseProps<TFieldValues, TName> & {
  mode?: "single"
} & DatePickerButtonPassthrough

export type FormDatePickerRangeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormDatePickerBaseProps<TFieldValues, TName> & {
  mode: "range"
} & DatePickerRangeButtonPassthrough

export type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormDatePickerSingleProps<TFieldValues, TName> | FormDatePickerRangeProps<TFieldValues, TName>
