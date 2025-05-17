import React from "react"
import { cn } from "../../../utils/cn"

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The label for the text field
   */
  label?: string
  /**
   * Helper text to display below the input
   */
  helperText?: string
  /**
   * Error message to display when the field is invalid
   */
  error?: string
  /**
   * Whether the field is required
   */
  required?: boolean
  /**
   * The full width of the field
   */
  fullWidth?: boolean
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { className, label, helperText, error, required, fullWidth = false, id, disabled, ...props },
    ref
  ) => {
    const inputId = id || `text-field-${Math.random().toString(36).substr(2, 9)}`
    const helperTextId = `${inputId}-helper-text`
    const errorId = `${inputId}-error`

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
            "dark:placeholder:text-gray-500",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
          disabled={disabled}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-sm text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

TextField.displayName = "TextField"
