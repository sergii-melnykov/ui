import * as React from "react"
import { useFormContext, type FieldValues, type FieldPath } from "react-hook-form"
import {
  RadioGroup,
  RadioGroupItem,
  RadioItemLabel,
  RadioItemContainer
} from "@/components/atoms/radio-group"
import {
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
  FormField
} from "@/components/rhf/form"
import {
  RHFRadioGroupOption,
  type RHFRadioGroupProps,
  type RHFRadioGroupWithOptionsProps
} from "./rhf-radio-group.types"

// ----------------------------------------------------------------------

/**
 * A radio group component that integrates with React Hook Form.
 * Provides form validation, error handling, and accessibility features.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-rhf-rhfradiogroup--docs
 *
 * @example
 * ```tsx
 * // Using children
 * <Form>
 *   <RHFRadioGroup name="preference" label="Select your preference">
 *     <RadioGroupItem value="option1" label="Option 1" />
 *     <RadioGroupItem value="option2" label="Option 2" />
 *   </RHFRadioGroup>
 * </Form>
 *
 * // Using options prop
 * <Form>
 *   <RHFRadioGroup
 *     name="preference"
 *     label="Select your preference"
 *     options={[
 *       { id: "option1", label: "Option 1" },
 *       { id: "option2", label: "Option 2" }
 *     ]}
 *   />
 * </Form>
 * ```
 */
export function RHFRadioGroup<
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
  children,
  ...other
}: RHFRadioGroupProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const hasOptions = "options" in other

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
              {...other}
            >
              {hasOptions &&
                (other as RHFRadioGroupWithOptionsProps<TFieldValues, TName>).options.map(
                  (option: RHFRadioGroupOption) => (
                    <RadioItemContainer key={option.id}>
                      <RadioGroupItem value={option.id} id={option.id} />
                      <RadioItemLabel htmlFor={option.id}>{option.label}</RadioItemLabel>
                    </RadioItemContainer>
                  )
                )}
              {!hasOptions && children}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage>{error.message}</FormMessage>}
          {!error && warningText && (
            <p className="text-sm text-yellow-600 dark:text-yellow-500" role="alert">
              {warningText}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}
