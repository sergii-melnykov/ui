"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/utils/index"
import { Label } from "@/components/atoms/label"
import type {
  RadioGroupItemProps,
  RadioGroupProps,
  RadioItemContainerProps,
  RadioItemLabelProps
} from "./radio-group.types"
import { radioGroupItemVariants } from "./radio-group.variants"

/**
 * RadioGroup component that allows users to select a single option from a list.
 * Built on top of Radix UI's RadioGroup primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-radio-group--docs
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option-1">
 *   <RadioGroupItem value="option-1" id="option-1" />
 *   <RadioItemLabel htmlFor="option-1">Option 1</RadioItemLabel>
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * RadioGroupItem component that represents a single option in a RadioGroup.
 * Built on top of Radix UI's RadioGroupItem primitive.
 */
const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants(), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="size-2 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/**
 * RadioItemContainer component that provides a container for radio group items with proper spacing and layout.
 */
const RadioItemContainer = React.forwardRef<HTMLDivElement, RadioItemContainerProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  }
)
RadioItemContainer.displayName = "RadioItemContainer"

/**
 * RadioItemLabel component that provides a label for individual radio items.
 */
const RadioItemLabel = React.forwardRef<React.ComponentRef<typeof Label>, RadioItemLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
RadioItemLabel.displayName = "RadioItemLabel"

export { RadioGroup, RadioGroupItem, RadioItemContainer, RadioItemLabel }
export { radioGroupItemVariants } from "./radio-group.variants"
