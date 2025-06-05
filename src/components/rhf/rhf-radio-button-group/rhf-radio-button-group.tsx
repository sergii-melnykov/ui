"use client"

import * as React from "react"
import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form"
import { RadioGroup } from "@/components/atoms/radio-group"
import { Button } from "@/components/atoms/button"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
  FormField
} from "@/components/rhf/form"
import { type RHFRadioButtonGroupProps } from "./rhf-radio-button-group.types"

// ----------------------------------------------------------------------

/**
 * A radio button group component that integrates with React Hook Form.
 * Uses buttons instead of traditional radio inputs for a more modern look.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-rhf-rhfradiobuttongroup--docs
 *
 * @example
 * ```tsx
 * <Form>
 *   <RHFRadioButtonGroup
 *     name="preference"
 *     label="Select your preference"
 *     options={[
 *       { value: "option1", label: "Option 1" },
 *       { value: "option2", label: "Option 2" },
 *       { value: "option3", label: "Option 3" }
 *     ]}
 *   />
 * </Form>
 * ```
 */
export function RHFRadioButtonGroup<
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
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  options,
  ...other
}: RHFRadioButtonGroupProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              aria-required={required}
              className="flex gap-2 p-2 border border-gray-200 rounded-md w-fit"
              {...other}
            >
              {options.map((option) => (
                <Button
                  key={option.id}
                  size={option.size ?? "sm"}
                  variant={field.value === option.id ? "default" : "secondary"}
                  onClick={() => field.onChange(option.id)}
                  role="radio"
                  aria-checked={field.value === option.id}
                  disabled={disabled}
                >
                  {option.label}
                </Button>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {warningText && <FormDescription className="text-warning">{warningText}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}
