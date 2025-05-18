import * as React from "react"
import { useFormContext, Controller, type FieldValues, type FieldPath } from "react-hook-form"
import { Textarea } from "@/components/atoms/textarea"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription
} from "@/components/atoms/form"
import { cn } from "@/utils/cn"
import { type RHFTextareaProps } from "./rhf-textarea.types"

// ----------------------------------------------------------------------

/**
 * A textarea component that integrates with React Hook Form.
 * Provides form validation, error handling, and accessibility features.
 *
 * @example
 * ```tsx
 * <RHFTextarea
 *   name="description"
 *   label="Description"
 *   required
 *   rules={{
 *     required: "Description is required",
 *     minLength: {
 *       value: 10,
 *       message: "Description must be at least 10 characters"
 *     }
 *   }}
 * />
 * ```
 */
export function RHFTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  className,
  warningText,
  required,
  disabled,
  readOnly,
  placeholder,
  autoResize,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  onBlur,
  ...other
}: RHFTextareaProps<TFieldValues, TName>) {
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
            <Textarea
              {...field}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value)
              }}
              onBlur={(e) => {
                // trim if a string
                if (typeof field.value === "string") {
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
              autoResize={autoResize}
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
