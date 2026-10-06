import * as React from "react"

import { cn } from "@/utils/cn"

import type { InputProps } from "./input.types"
import { inputVariants } from "./input.variants"

/**
 * Input component for creating accessible input fields.
 * Built on top of shadcn/ui's Input component.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-input--docs
 *
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, shape, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ shape }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
