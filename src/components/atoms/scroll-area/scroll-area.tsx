/* eslint-disable no-use-before-define */
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/utils/index"
import { ScrollAreaProps, ScrollBarProps } from "./scroll-area.types"

/**
 * ScrollArea component that provides a custom scrollable area with a styled scrollbar.
 * Built on top of Radix UI's ScrollArea primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-scroll-area--docs
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
 *   <div className="space-y-4">
 *     <h4 className="text-sm font-medium leading-none">Scroll Area</h4>
 *     <p className="text-sm text-muted-foreground">
 *       Scrollable content goes here...
 *     </p>
 *   </div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
