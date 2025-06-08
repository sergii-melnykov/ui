import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

export type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

export type ScrollBarProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  orientation?: "vertical" | "horizontal"
}
