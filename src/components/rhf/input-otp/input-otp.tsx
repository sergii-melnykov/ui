"use client"

import * as React from "react"
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/atoms/input-otp"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/rhf/form"

import type { FormInputOTPProps } from "./input-otp.types"

const DEFAULT_MAX_LENGTH = 6

/**
 * OTP input integrated with React Hook Form (string value).
 */
export function FormInputOTP<
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
  maxLength = DEFAULT_MAX_LENGTH,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  containerClassName
}: FormInputOTPProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const isDisabled = disabled ?? readOnly

  const slots = React.useMemo(() => {
    const indices = Array.from({ length: maxLength }, (_, index) => index)
    if (maxLength <= 4) {
      return indices
    }
    const mid = Math.ceil(maxLength / 2)
    return { first: indices.slice(0, mid), second: indices.slice(mid) }
  }, [maxLength])

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
            <InputOTP
              maxLength={maxLength}
              value={field.value ?? ""}
              onChange={field.onChange}
              disabled={isDisabled}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-invalid={!!error}
              aria-required={required}
              containerClassName={containerClassName}
            >
              {Array.isArray(slots) ? (
                <InputOTPGroup>
                  {slots.map((index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              ) : (
                <>
                  <InputOTPGroup>
                    {slots.first.map((index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {slots.second.map((index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </>
              )}
            </InputOTP>
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
