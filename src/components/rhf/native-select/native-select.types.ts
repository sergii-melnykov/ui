import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import type { NativeSelect } from "@/components/atoms/native-select"

export type FormNativeSelectOption<T extends string | number = string | number> = {
  id: T
  label: string
  disabled?: boolean
}

export interface FormNativeSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionId extends string | number = string | number
> extends Omit<React.ComponentProps<typeof NativeSelect>, "name" | "value" | "onChange"> {
  name: TName
  label?: string
  description?: string
  warningText?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  options: FormNativeSelectOption<TOptionId>[]
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
}
