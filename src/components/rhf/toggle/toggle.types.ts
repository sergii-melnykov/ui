import type * as React from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

import type { Toggle } from "@/components/atoms/toggle"

export interface FormToggleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<typeof Toggle>, "name" | "pressed" | "onPressedChange"> {
  name: TName
  label?: string
  description?: string
  warningText?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  className?: string
  "aria-label"?: string
  "aria-describedby"?: string
}
