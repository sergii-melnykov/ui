"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "@/utils/index"
import { ComponentProps } from "react"

/**
 * Resizable component that provides resizable panel functionality.
 * Built on top of react-resizable-panels.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-resizable--docs
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup>
 *   <ResizablePanel defaultSize={20}>
 *     <div>Left Panel</div>
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={80}>
 *     <div>Right Panel</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
type ResizablePanelGroupProps = Omit<
  ComponentProps<typeof ResizablePrimitive.Group>,
  "direction"
> & {
  /** Back-compat alias for `orientation` (react-resizable-panels v4) */
  direction?: "horizontal" | "vertical"
}

const ResizablePanelGroup = ({
  className,
  direction,
  orientation,
  ...props
}: ResizablePanelGroupProps) => (
  <ResizablePrimitive.Group
    orientation={orientation ?? direction ?? "horizontal"}
    className={cn("flex h-full w-full data-[orientation=vertical]:flex-col", className)}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
