import * as React from "react"
import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form"
import { MultiSelect } from "@/components/atoms/select"

import { cn } from "@/utils/cn"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
  FormField
} from "@/components/rhf/form"
import { type RHFMultiSelectProps } from "./rhf-select.types"

// ----------------------------------------------------------------------

/**
 * A multi-select component that integrates with React Hook Form.
 * Provides form validation, error handling, and accessibility features.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-rhf-rhfmultiselect--docs
 *
 * @example
 * ```tsx
 * <Form>
 *   <RHFMultiSelect
 *     name="countries"
 *     label="Countries"
 *     options={[
 *       { id: "us", label: "United States" },
 *       { id: "ca", label: "Canada" }
 *     ]}
 *     maxItems={3}
 *   />
 * </Form>
 * ```
 */
export function RHFMultiSelect<
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
}: RHFMultiSelectProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <MultiSelect
                {...field}
                options={options}
                value={field.value || []}
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
        )
      }}
    />
  )
}
