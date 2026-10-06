import type { FieldPath, FieldValues } from "react-hook-form"

export type FormComboboxOption<T extends string | number = string | number> = {
  id: T
  label: string
  disabled?: boolean
}

export interface FormComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionId extends string | number = string | number
> {
  name: TName
  label?: string
  description?: string
  warningText?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  className?: string
  fullWidth?: boolean
  multiple?: boolean
  showClear?: boolean
  options: FormComboboxOption<TOptionId>[]
  "aria-label"?: string
  "aria-describedby"?: string
}
