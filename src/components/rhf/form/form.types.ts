import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { ControllerProps, FieldPath, FieldValues, UseFormReturn } from "react-hook-form"

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
export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>

/** Props for the FormItem component. */
export type FormItemProps = React.HTMLAttributes<HTMLDivElement>

/** Props for the FormLabel component. */
export type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

/** Props for the FormControl component. */
export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>

/** Props for the FormDescription component. */
export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

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

/**
 * Props interface for the FormProvider component.
 */
export interface FormProviderProps {
  /**
   * The form children
   */
  children: React.ReactNode
  /**
   * The form methods from react-hook-form
   */
  methods: UseFormReturn
  /**
   * Optional form submission handler
   */
  onSubmit?: VoidFunction
}
