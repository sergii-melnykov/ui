import type { FieldPath, FieldValues } from "react-hook-form"

export interface FormInputOTPProps<
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
  maxLength?: number
  className?: string
  containerClassName?: string
  "aria-label"?: string
  "aria-describedby"?: string
}
