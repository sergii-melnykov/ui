import { ComponentProps } from "react"
import * as ResizablePrimitive from "react-resizable-panels"

export type ResizablePanelGroupProps = ComponentProps<typeof ResizablePrimitive.PanelGroup>

export type ResizablePanelProps = ComponentProps<typeof ResizablePrimitive.Panel>

export type ResizableHandleProps = ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}
