"use client"

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import {
  DatePicker,
  DatePickerButton,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerRangeButton,
  DatePickerTrigger
} from "@/components/atoms/date-picker"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import type { FormDatePickerProps } from "./date-picker.types"

/**
 * Date picker integrated with React Hook Form.
 * Single mode stores `Date | undefined`; range mode stores `DateRange | undefined`.
 */
export function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormDatePickerProps<TFieldValues, TName>) {
  const {
    name,
    label,
    description,
    warningText,
    required,
    disabled,
    readOnly,
    placeholder,
    className,
    mode = "single",
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props

  const { control } = useFormContext<TFieldValues>()
  const isDisabled = disabled ?? readOnly

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {label ? (
            <FormLabel>
              {label}
              {required ? <span className="text-destructive ml-1">*</span> : null}
            </FormLabel>
          ) : null}
          <FormControl>
            <DatePicker>
              <DatePickerTrigger asChild>
                {mode === "range" ? (
                  <DatePickerRangeButton
                    range={field.value}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedby}
                    aria-invalid={!!error}
                    aria-required={required}
                    className={cn(error && "border-destructive")}
                    {...rest}
                  />
                ) : (
                  <DatePickerButton
                    date={field.value}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedby}
                    aria-invalid={!!error}
                    aria-required={required}
                    className={cn(error && "border-destructive")}
                    {...rest}
                  />
                )}
              </DatePickerTrigger>
              <DatePickerContent>
                {mode === "range" ? (
                  <DatePickerCalendar
                    mode="range"
                    selected={field.value}
                    onSelect={(range) => {
                      field.onChange(range)
                    }}
                    disabled={isDisabled}
                  />
                ) : (
                  <DatePickerCalendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                    }}
                    disabled={isDisabled}
                  />
                )}
              </DatePickerContent>
            </DatePicker>
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          {error ? <FormMessage>{error.message}</FormMessage> : null}
          {!error && warningText ? (
            <p className="text-sm text-yellow-600 dark:text-yellow-500" role="alert">
              {warningText}
            </p>
          ) : null}
        </FormItem>
      )}
    />
  )
}
