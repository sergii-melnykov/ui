"use client"

/**
 * Checkbox component built on top of Radix UI's Checkbox primitive.
 * Provides a customizable checkbox input with proper accessibility and keyboard navigation.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-checkbox--docs
 *
 * @example
 * ```tsx
 * <Checkbox id="terms" name="terms" />
 * <label htmlFor="terms">Accept terms and conditions</label>
 * ```
 */
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/utils/index"
import type { CheckboxProps } from "./checkbox.types"
import { checkboxVariants } from "./checkbox.variants"

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(checkboxVariants(), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
        aria-hidden="true"
      >
        <Check className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
export { checkboxVariants } from "./checkbox.variants"
