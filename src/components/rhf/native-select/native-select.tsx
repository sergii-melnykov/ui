"use client"

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import { NativeSelect, NativeSelectOption } from "@/components/atoms/native-select"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import type { FormNativeSelectProps } from "./native-select.types"

export function FormNativeSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOptionId extends string | number = string | number
>({
  name,
  label,
  description,
  warningText,
  required,
  disabled,
  readOnly,
  placeholder,
  options,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  ...other
}: FormNativeSelectProps<TFieldValues, TName, TOptionId>) {
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
            <NativeSelect
              value={field.value != null ? String(field.value) : ""}
              onChange={(event) => {
                const raw = event.target.value
                const match = options.find((option) => String(option.id) === raw)
                field.onChange(match?.id ?? raw)
              }}
              disabled={isDisabled}
              required={required}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              className={cn("w-full", error && "border-destructive")}
              {...other}
            >
              {placeholder ? (
                <NativeSelectOption value="" disabled>
                  {placeholder}
                </NativeSelectOption>
              ) : null}
              {options.map((option) => (
                <NativeSelectOption
                  key={String(option.id)}
                  value={String(option.id)}
                  disabled={option.disabled}
                >
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
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
