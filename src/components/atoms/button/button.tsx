import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/utils/cn"
import { Loader2 } from "lucide-react"
import { ButtonProps } from "./button.types"
import { buttonVariants } from "./button.variants"

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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" role="status" aria-label="Loading" />
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
