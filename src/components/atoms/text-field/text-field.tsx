import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { TextFieldProps } from "./text-field.types"
import { Loader2 } from "lucide-react"

/**
 * Text field variant styles using class-variance-authority.
 * Defines the visual styles for different text field variants and sizes.
 */
const textFieldVariants = cva(
  "flex w-full items-center rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive"
      },
      size: {
        default: "h-10 px-3",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

/**
 * A versatile text field component that supports multiple variants, sizes, and icons.
 *
 * @component
 * @example
 * ```tsx
 * // Default text field
 * <TextField placeholder="Enter text" />
 *
 * // With icons
 * <TextField startIcon={<SearchIcon />} placeholder="Search..." />
 * <TextField endIcon={<CalendarIcon />} placeholder="Select date" />
 *
 * // With loading state
 * <TextField loading placeholder="Loading..." />
 *
 * // With error
 * <TextField error="Invalid input" placeholder="Enter text" />
 * ```
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      variant,
      size,
      startIcon,
      endIcon,
      loading = false,
      error,
      label,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    const id = React.useId()

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}
          <input
            id={id}
            className={cn(
              textFieldVariants({ variant: error ? "error" : variant, size, className }),
              startIcon && "pl-9",
              (endIcon || loading) && "pr-9"
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
          />
          {(endIcon || loading) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : endIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={cn("text-sm", error ? "text-destructive" : "text-muted-foreground")}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

TextField.displayName = "TextField"

export { TextField, textFieldVariants }
