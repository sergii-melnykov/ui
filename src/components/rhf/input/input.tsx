"use client"

import * as React from "react"
import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form"
import { Input } from "@/components/atoms/input"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
  FormField
} from "@/components/rhf/form"
import { type FormInputProps } from "./input.types"

// ----------------------------------------------------------------------

/**
 * A text field component that integrates with React Hook Form.
 * Provides form validation, error handling, and accessibility features.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/form-input--docs
 *
 * * @example
 * ```tsx
 * <Form>
 *   <FormInput name="name" label="Name" />
 *   <FormInput name="email" label="Email" />
 * </Form>
 * ```
 */
export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  className,
  type = "text",
  warningText,
  required,
  disabled,
  readOnly,
  placeholder,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  onBlur,
  ...other
}: FormInputProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              type={type}
              value={type === "number" && field.value === 0 ? "" : field.value}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(Number(e.target.value))
                } else {
                  field.onChange(e.target.value)
                }
              }}
              onBlur={(e) => {
                if (type !== "number") {
                  const rawValue: unknown = field.value
                  if (typeof rawValue === "string") {
                    field.onChange(rawValue.trim())
                  }
                }
                field.onBlur() // pass to react-hook-form
                onBlur?.(e) // pass to wrapper
              }}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive",
                className
              )}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              placeholder={placeholder}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              aria-required={required}
              {...other}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
          {!error && warningText && (
            <p className="text-sm text-yellow-600 dark:text-yellow-500" role="alert">
              {warningText}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}
