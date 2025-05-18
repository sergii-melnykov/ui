/**
 * Stack is a layout component that arranges its children in a vertical or horizontal stack
 * with consistent spacing between items. It's built on top of Flexbox and provides
 * a simple way to create consistent layouts.
 *
 * @example
 * ```tsx
 * // Basic vertical stack
 * <Stack>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * // Horizontal stack with custom spacing
 * <Stack direction="horizontal" spacing="lg">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 *
 * // Centered stack with wrapping
 * <Stack direction="horizontal" center wrap>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * // Stack with custom alignment
 * <Stack align="center" justify="between">
 *   <div>Left</div>
 *   <div>Center</div>
 *   <div>Right</div>
 * </Stack>
 * ```
 */
import * as React from "react"
import { cn } from "@/utils"

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The direction in which to stack the items.
   * - "vertical": Items are stacked top to bottom
   * - "horizontal": Items are stacked left to right
   *
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal"
  /**
   * The spacing between items in the stack.
   * - "none": 0px
   * - "xs": 0.25rem (4px)
   * - "sm": 0.5rem (8px)
   * - "md": 1rem (16px)
   * - "lg": 1.5rem (24px)
   * - "xl": 2rem (32px)
   *
   * @default "md"
   */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  /**
   * Whether to allow items to wrap to the next line when they don't fit.
   * Only applies to horizontal stacks.
   *
   * @default false
   */
  wrap?: boolean
  /**
   * Whether to center items both horizontally and vertically.
   * This is a shorthand for setting both align and justify to "center".
   *
   * @default false
   */
  center?: boolean
  /**
   * How to justify items along the main axis.
   * - "start": Items are packed toward the start
   * - "end": Items are packed toward the end
   * - "center": Items are centered
   * - "between": Items are evenly distributed with first item at start and last at end
   * - "around": Items are evenly distributed with equal space around them
   * - "evenly": Items are distributed so that the spacing between any two items is equal
   *
   * @default undefined
   */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  /**
   * How to align items along the cross axis.
   * - "start": Items are aligned at the start
   * - "end": Items are aligned at the end
   * - "center": Items are centered
   * - "stretch": Items are stretched to fill the container
   * - "baseline": Items are aligned at their baselines
   *
   * @default undefined
   */
  align?: "start" | "end" | "center" | "stretch" | "baseline"
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "vertical",
      spacing = "md",
      wrap = false,
      center = false,
      justify,
      align,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "flex",
          // Direction
          direction === "vertical" ? "flex-col" : "flex-row",
          // Spacing
          {
            "gap-0": spacing === "none",
            "gap-1": spacing === "xs",
            "gap-2": spacing === "sm",
            "gap-4": spacing === "md",
            "gap-6": spacing === "lg",
            "gap-8": spacing === "xl"
          },
          // Wrap
          wrap && "flex-wrap",
          // Center
          center && "items-center justify-center",
          // Justify
          justify && {
            "justify-start": justify === "start",
            "justify-end": justify === "end",
            "justify-center": justify === "center",
            "justify-between": justify === "between",
            "justify-around": justify === "around",
            "justify-evenly": justify === "evenly"
          },
          // Align
          align && {
            "items-start": align === "start",
            "items-end": align === "end",
            "items-center": align === "center",
            "items-stretch": align === "stretch",
            "items-baseline": align === "baseline"
          },
          className
        )}
        {...props}
      />
    )
  }
)

Stack.displayName = "Stack"

export { Stack }
