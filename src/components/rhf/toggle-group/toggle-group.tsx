"use client"

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import type { FormToggleGroupProps } from "./toggle-group.types"

export function FormToggleGroup<
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
  options,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  ...other
}: FormToggleGroupProps<TFieldValues, TName>) {
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
            <ToggleGroup
              type="single"
              value={field.value ?? ""}
              onValueChange={(value) => {
                field.onChange(value || undefined)
              }}
              disabled={isDisabled}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              aria-required={required}
              className={cn(error && "ring-destructive/20")}
              {...other}
            >
              {options.map((option) => (
                <ToggleGroupItem
                  key={option.id}
                  value={option.id}
                  disabled={option.disabled ?? isDisabled}
                  aria-label={typeof option.label === "string" ? option.label : option.id}
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
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
