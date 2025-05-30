import * as React from "react"
import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form"
import { Select } from "@/components/atoms/select"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
  FormField
} from "@/components/rhf/form"
import { type RHFSelectProps } from "./rhf-select.types"

// ----------------------------------------------------------------------

/**
 * A select component that integrates with React Hook Form.
 * Provides form validation, error handling, and accessibility features.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-rhf-rhfselect--docs
 *
 * @example
 * ```tsx
 * <Form>
 *   <RHFSelect
 *     name="country"
 *     label="Country"
 *     options={[
 *       { id: "us", label: "United States" },
 *       { id: "ca", label: "Canada" }
 *     ]}
 *   />
 * </Form>
 * ```
 */
export function RHFSelect<
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
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  options,
  ...other
}: RHFSelectProps<TFieldValues, TName>) {
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
            <Select
              {...field}
              options={options}
              value={field.value || ""}
              onChange={field.onChange}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive",
                className
              )}
              disabled={disabled || readOnly}
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
