import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { Spinner } from "@/components/atoms/spinner/spinner"
import { cn } from "@/utils/cn"

import { ButtonProps } from "./button.types"
import { buttonVariants } from "./button.variants"

/**
 * A versatile button component that supports multiple variants, sizes, and can be rendered as a child component.
 * Built on top of Radix UI's Slot primitive for maximum flexibility.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-button--docs
 *
 * @example
 * ```tsx
 * <Button>Click me</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button variant="outline" size="icon" aria-label="Add">
 *   <CirclePlus />
 * </Button>
 * <Button variant="link" asChild>
 *   <a href="/about">About</a>
 * </Button>
 * ```
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

    if (asChild) {
      return (
        <Comp
          data-slot="button"
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
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        type={type}
        aria-label={buttonAriaLabel}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Spinner data-icon="inline-start" className="animate-spin" />
        ) : (
          startIcon && (
            <span data-icon="inline-start" aria-hidden="true">
              {startIcon}
            </span>
          )
        )}
        {children}
        {!loading && endIcon && (
          <span data-icon="inline-end" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
