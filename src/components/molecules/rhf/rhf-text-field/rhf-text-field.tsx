import * as React from "react"
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
  type FieldPath
} from "react-hook-form"
import { Input } from "@/components/atoms/input"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription
} from "@/components/atoms/form"
import { cn } from "@/utils/cn"
import { type RHFTextFieldProps } from "./rhf-text-field.types"

// ----------------------------------------------------------------------

/**
 * A text field component that integrates with React Hook Form.
 * Provides form validation, error handling, and accessibility features.
 *
 * @url https://segiimelnykov.github.io/ui/?path=/docs/molecules-rhf-text-field--docs
 *
 * @example
 * ```tsx
 * <RHFTextField
 *   name="email"
 *   label="Email"
 *   type="email"
 *   required
 *   rules={{
 *     required: "Email is required",
 *     pattern: {
 *       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
 *       message: "Invalid email address"
 *     }
 *   }}
 * />
 * ```
 */
export function RHFTextField<
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
}: RHFTextFieldProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <Controller
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
                // trim if a string
                if (type !== "number" && typeof field.value === "string") {
                  field.onChange(field.value.trim())
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
