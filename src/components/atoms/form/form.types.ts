import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"

/**
 * Props interface for the Form component.
 * Extends react-hook-form's FormProvider props.
 */
export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  /**
   * The form context value
   */
  context: React.Context<TFieldValues>
  /**
   * The form children
   */
  children: React.ReactNode
}

/**
 * Props interface for the FormField component.
 * Extends react-hook-form's Controller props.
 */
export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {}

/**
 * Props interface for the FormItem component.
 * Extends HTML div attributes.
 */
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props interface for the FormLabel component.
 * Extends Radix UI Label props.
 */
export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}

/**
 * Props interface for the FormControl component.
 * Extends Radix UI Slot props.
 */
export interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {}

/**
 * Props interface for the FormDescription component.
 * Extends HTML paragraph attributes.
 */
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Props interface for the FormMessage component.
 * Extends HTML paragraph attributes.
 */
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * The message content
   */
  children?: React.ReactNode
}

/**
 * Context value type for form field context
 */
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

/**
 * Context value type for form item context
 */
export type FormItemContextValue = {
  id: string
}
