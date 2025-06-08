import type { DndInputProps } from "@/components/atoms/dnd-input/dnd-input.types"
import type { FieldValues, FieldPath, RegisterOptions } from "react-hook-form"

/**
 * Props interface for the RhfDndInput component.
 * Extends DndInputProps to add React Hook Form specific properties.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-dnd-input--docs
 */
export interface RhfDndInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<DndInputProps, "name"> {
  /** The name of the form field */
  name: TName
  /** React Hook Form validation rules */
  rules?: RegisterOptions<TFieldValues, TName>
  /** Label text for the form field */
  label?: string
  /** Description text for the form field */
  description?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** ARIA label for accessibility */
  "aria-label"?: string
  /** ARIA describedby for accessibility */
  "aria-describedby"?: string
}
