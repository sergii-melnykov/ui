"use client"

import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import { ComboboxOptionsControl } from "./combobox-options-control"
import type { FormComboboxProps } from "./combobox.types"

/**
 * Searchable combobox integrated with React Hook Form.
 */
export function FormCombobox<
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
  className,
  options,
  multiple,
  showClear,
  fullWidth
}: FormComboboxProps<TFieldValues, TName, TOptionId>) {
  const { control } = useFormContext<TFieldValues>()

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
            <ComboboxOptionsControl
              options={options}
              value={field.value}
              onChange={field.onChange}
              multiple={multiple}
              placeholder={placeholder}
              disabled={disabled ?? readOnly}
              required={required}
              showClear={showClear}
              fullWidth={fullWidth}
              error={!!error}
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
      )}
    />
  )
}
