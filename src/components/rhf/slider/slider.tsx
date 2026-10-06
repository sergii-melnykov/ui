"use client"

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import { Slider } from "@/components/atoms/slider"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import type { FormSliderProps } from "./slider.types"

function toSliderValue(value: unknown): number[] | undefined {
  if (typeof value === "number") {
    return [value]
  }
  if (Array.isArray(value) && value.every((entry) => typeof entry === "number")) {
    return value
  }
  return undefined
}

function formatSliderDisplay(value: unknown): string {
  const normalized = toSliderValue(value)
  if (!normalized) {
    return ""
  }
  return normalized.join(" – ")
}

export function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  warningText,
  required,
  disabled,
  readOnly,
  showValue,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  ...other
}: FormSliderProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const isDisabled = disabled ?? readOnly

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const displayValue = formatSliderDisplay(field.value)
        const sliderValue = toSliderValue(field.value)

        return (
          <FormItem className={className}>
            {label ? (
              <FormLabel>
                {label}
                {required ? <span className="text-destructive ml-1">*</span> : null}
                {showValue && displayValue ? (
                  <span className="text-muted-foreground ml-2 font-normal">{displayValue}</span>
                ) : null}
              </FormLabel>
            ) : null}
            <FormControl>
              <Slider
                value={sliderValue}
                onValueChange={(values) => {
                  field.onChange(values.length === 1 ? values[0] : values)
                }}
                disabled={isDisabled}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
                aria-invalid={!!error}
                aria-required={required}
                className={cn(error && "aria-invalid:ring-destructive/20")}
                {...other}
              />
            </FormControl>
            {description ? <FormDescription>{description}</FormDescription> : null}
            {error ? <FormMessage>{error.message}</FormMessage> : null}
            {!error && warningText ? (
              <p className="text-sm text-yellow-600 dark:text-yellow-500" role="alert">
                {warningText}
              </p>
            ) : null}
          </FormItem>
        )
      }}
    />
  )
}
