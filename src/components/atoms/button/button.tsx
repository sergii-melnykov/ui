import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { ButtonProps } from "./button.types"
import { Loader2 } from "lucide-react"

/**
 * Button variant styles using class-variance-authority.
 * Defines the visual styles for different button variants and sizes.
 * Follows WCAG 2.1 Level AA guidelines for accessibility.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">Click me</Button>
 * ```
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      } as const,
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      } as const
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

/**
 * A versatile button component that supports multiple variants, sizes, and can be rendered as a child component.
 * Built on top of Radix UI's Slot primitive for maximum flexibility.
 * Implements proper accessibility features and follows WCAG 2.1 Level AA guidelines.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-button--docs
 *
 * @component
 * @example
 * ```tsx
 * // Default button
 * <Button>Click me</Button>
 *
 * // Destructive button with small size
 * <Button variant="destructive" size="sm">Delete</Button>
 *
 * // As a link
 * <Button variant="link" asChild>
 *   <a href="/about">About</a>
 * </Button>
 *
 * // With icons
 * <Button startIcon={<Icon />}>With Start Icon</Button>
 * <Button endIcon={<Icon />}>With End Icon</Button>
 *
 * // Loading state
 * <Button loading>Loading</Button>
 * ```
 *
 * @param {ButtonProps} props - The component props
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 * @returns {JSX.Element} A button element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      startIcon,
      endIcon,
      loading = false,
      disabled,
      children,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    const buttonAriaLabel = ariaLabel || (typeof children === "string" ? children : undefined)

    // Handle keyboard interaction
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        if (!isDisabled && props.onClick) {
          props.onClick(event as unknown as React.MouseEvent<HTMLButtonElement>)
        }
      }
    }

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isDisabled}
          type={type}
          aria-label={buttonAriaLabel}
          aria-disabled={isDisabled}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        type={type}
        aria-label={buttonAriaLabel}
        aria-disabled={isDisabled}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {loading && (
          <Loader2
            className="mr-2 h-4 w-4 animate-spin"
            role="status"
            aria-label="Loading"
            aria-hidden="true"
          />
        )}
        {!loading && startIcon && (
          <span className="mr-2" aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {!loading && endIcon && (
          <span className="ml-2" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
