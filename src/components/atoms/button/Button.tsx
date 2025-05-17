import React from "react"
import { ButtonProps } from "./Button.types"
import { cn } from "@/lib/utils"

export const Button = React.memo(
  ({
    variant = "primary",
    size = "md",
    color = "default",
    isLoading = false,
    isDisabled = false,
    startIcon,
    endIcon,
    children,
    className,
    type = "button",
    ...props
  }: ButtonProps) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variantClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
      ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent"
    }

    const colorClasses = {
      default: "",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      success: "bg-green-600 text-white hover:bg-green-700",
      warning: "bg-yellow-500 text-white hover:bg-yellow-600",
      error: "bg-red-600 text-white hover:bg-red-700",
      info: "bg-blue-600 text-white hover:bg-blue-700"
    }

    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg"
    }

    const iconSizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    }

    return (
      <button
        type={type}
        className={cn(
          baseClasses,
          variantClasses[variant],
          colorClasses[color],
          sizeClasses[size],
          isLoading && "relative",
          className
        )}
        disabled={isDisabled || isLoading}
        aria-disabled={isDisabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg
              className={cn("animate-spin text-current", iconSizeClasses[size])}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <span className={cn("inline-flex items-center gap-2", isLoading && "opacity-0")}>
          {startIcon && (
            <span className={cn("inline-flex", iconSizeClasses[size])}>{startIcon}</span>
          )}
          {children}
          {endIcon && <span className={cn("inline-flex", iconSizeClasses[size])}>{endIcon}</span>}
        </span>
      </button>
    )
  }
)

Button.displayName = "Button"
