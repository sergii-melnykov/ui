import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/utils"
import { Label } from "@/components/atoms/label"

/**
 * RadioGroup component that allows users to select a single option from a list.
 * Built on top of Radix UI's RadioGroup primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-radio-group--docs
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option-1">
 *   <RadioGroupItem value="option-1">Option 1</RadioGroupItem>
 *   <RadioGroupItem value="option-2">Option 2</RadioGroupItem>
 * </RadioGroup>
 * ```
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} ref={ref} />
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * RadioGroupItem component that represents a single option in a RadioGroup.
 * Built on top of Radix UI's RadioGroupItem primitive.
 *
 * @example
 * ```tsx
 * <RadioGroupItem value="option-1">Option 1</RadioGroupItem>
 * ```
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/**
 * RadioItemContainer component that provides a container for radio group items with proper spacing and layout.
 *
 * @example
 * ```tsx
 * <RadioItemContainer>
 *   <RadioGroupItem value="option-1">Option 1</RadioGroupItem>
 *   <RadioGroupItem value="option-2">Option 2</RadioGroupItem>
 * </RadioItemContainer>
 * ```
 */
const RadioItemContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  }
)
RadioItemContainer.displayName = "RadioItemContainer"

/**
 * RadioItemLabel component that provides a label for individual radio items.
 * Built on top of the Label component.
 *
 * @example
 * ```tsx
 * <RadioItemLabel>Select an option</RadioItemLabel>
 * ```
 */
const RadioItemLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
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
})
RadioItemLabel.displayName = "RadioItemLabel"

export { RadioGroup, RadioGroupItem, RadioItemContainer, RadioItemLabel }
