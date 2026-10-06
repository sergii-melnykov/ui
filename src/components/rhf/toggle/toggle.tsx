"use client"

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import { Toggle } from "@/components/atoms/toggle"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import type { FormToggleProps } from "./toggle.types"

/** Boolean toggle integrated with React Hook Form (`pressed` ↔ field value). */
export function FormToggle<
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
  className,
  children,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  ...other
}: FormToggleProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const isDisabled = disabled ?? readOnly

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
          <FormControl>
            <Toggle
              pressed={!!field.value}
              onPressedChange={field.onChange}
              disabled={isDisabled}
              aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              aria-required={required}
              {...other}
            >
              {children}
            </Toggle>
          </FormControl>
          <div className="space-y-1 leading-none">
            {label ? (
              <FormLabel>
                {label}
                {required ? <span className="text-destructive ml-1">*</span> : null}
              </FormLabel>
            ) : null}
            {description ? <FormDescription>{description}</FormDescription> : null}
            {error ? <FormMessage>{error.message}</FormMessage> : null}
            {!error && warningText ? (
              <p className="text-sm text-yellow-600 dark:text-yellow-500" role="alert">
                {warningText}
              </p>
            ) : null}
          </div>
        </FormItem>
      )}
    />
  )
}
