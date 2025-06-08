"use client"

import * as React from "react"
import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form"
import { DndInput } from "@/components/atoms/dnd-input"
import { cn } from "@/utils/cn"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
  FormField
} from "@/components/rhf/form"
import type { RhfDndInputProps } from "./rhf-dnd-input.types"

/**
 * RhfDndInput is a React Hook Form wrapper around the DndInput component.
 * It provides form integration with validation and error handling.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-dnd-input--docs
 *
 * @example
 * ```tsx
 * // Basic usage with React Hook Form
 * <Form>
 *   <RhfDndInput
 *     name="files"
 *     label="Upload Files"
 *     rules={{ required: "Please upload a file" }}
 *   />
 * </Form>
 *
 * // With file type restrictions
 * <Form>
 *   <RhfDndInput
 *     name="files"
 *     label="Upload Images"
 *     accept={{ 'image/*': ['.png', '.jpg'] }}
 *     rules={{
 *       required: "Please upload a file",
 *       validate: (files) => files.length > 0 || "At least one file is required"
 *     }}
 *   />
 * </Form>
 * ```
 */
export function RhfDndInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  className,
  required,
  disabled,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  ...other
}: RhfDndInputProps<TFieldValues, TName>) {
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
            <DndInput
              {...field}
              {...other}
              disabled={disabled}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              aria-required={required}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive",
                className
              )}
              onDrop={(acceptedFiles, fileRejections, event) => {
                field.onChange(acceptedFiles)
                other.onDrop?.(acceptedFiles, fileRejections, event)
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}
