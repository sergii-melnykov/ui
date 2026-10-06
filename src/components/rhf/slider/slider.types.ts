import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import type { Slider } from "@/components/atoms/slider"

export interface FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<typeof Slider>, "name" | "value" | "onValueChange"> {
  name: TName
  label?: string
  description?: string
  warningText?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  showValue?: boolean
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
}
