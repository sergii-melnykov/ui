import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn
} from "react-hook-form"

import { cn } from "@/utils/index"
import { Label } from "@/components/atoms/label"
import type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormFieldContextValue,
  FormItemContextValue,
  FormProviderProps
} from "./form.types"

/**
 * Form component that provides form context to all child components.
 * Built on top of react-hook-form's FormProvider.
 */
const Form = ({ children, methods, onSubmit }: FormProviderProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  )
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

/**
 * FormField component that wraps react-hook-form's Controller component.
 * Provides form field context to child components.
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * Hook to access form field context and state.
 * Must be used within a FormField component.
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

/**
 * FormItem component that provides spacing and layout for form fields.
 */
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} role="group" {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

/**
 * FormLabel component that provides accessible labels for form fields.
 */
const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <Label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          error && "text-destructive",
          className
        )}
        htmlFor={formItemId}
        {...props}
      />
    )
  }
)
FormLabel.displayName = "FormLabel"

/**
 * FormControl component that provides accessible form controls.
 */
const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    )
  }
)
FormControl.displayName = "FormControl"

/**
 * FormDescription component that provides additional context for form fields.
 */
const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-[0.8rem] text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
FormDescription.displayName = "FormDescription"

/**
 * FormMessage component that displays error messages for form fields.
 */
const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message ?? "") : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-[0.8rem] font-medium text-destructive", className)}
        role="alert"
        {...props}
      >
        {body}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
}
