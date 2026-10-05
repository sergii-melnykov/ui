import { ComponentProps } from "react"
import * as ResizablePrimitive from "react-resizable-panels"

export type ResizablePanelGroupProps = ComponentProps<typeof ResizablePrimitive.Group> & {
  /** @deprecated Use `orientation` (react-resizable-panels v4) */
  direction?: "horizontal" | "vertical"
}

export type ResizablePanelProps = ComponentProps<typeof ResizablePrimitive.Panel>

export type ResizableHandleProps = ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean
}
