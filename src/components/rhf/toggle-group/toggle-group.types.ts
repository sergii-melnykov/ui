import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import type { ToggleGroup } from "@/components/atoms/toggle-group"

export type FormToggleGroupOption = {
  id: string
  label: React.ReactNode
  disabled?: boolean
}

export interface FormToggleGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
  React.ComponentProps<typeof ToggleGroup>,
  "name" | "value" | "onValueChange" | "type" | "defaultValue"
> {
  name: TName
  label?: string
  description?: string
  warningText?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  options: FormToggleGroupOption[]
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
}
