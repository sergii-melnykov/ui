"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/utils/index"
import { SwitchProps } from "./switch.types"
import { switchThumbVariants, switchVariants } from "./switch.variants"

/**
 * Switch component that provides a toggle input control.
 * Built on top of Radix UI's Switch primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-switch--docs
 *
 * @example
 * ```tsx
 * <Switch />
 * <Switch defaultChecked />
 * <Switch disabled />
 * <Switch size="sm" />
 * ```
 */
const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, size, ...props }, ref) => (
    <SwitchPrimitives.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ size }))}
      />
    </SwitchPrimitives.Root>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
export { switchVariants, switchThumbVariants } from "./switch.variants"
