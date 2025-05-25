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

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
        aria-hidden="true"
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
