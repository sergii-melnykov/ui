import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  /**
   * The value of the tab that should be active when initially rendered.
   * Use when you do not need to control the state of the tabs.
   */
  defaultValue?: string
  /**
   * The controlled value of the tab to activate.
   * Should be used with onValueChange.
   */
  value?: string
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * The orientation of the tabs.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical"
  /**
   * The direction of the tabs.
   * @default "ltr"
   */
  dir?: "ltr" | "rtl"
}

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /**
   * Additional CSS class names to apply to the tabs list.
   */
  className?: string
}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /**
   * Additional CSS class names to apply to the tab trigger.
   */
  className?: string
  /**
   * The value of the tab trigger.
   * Must be unique within the tabs component.
   */
  value: string
  /**
   * Whether the tab trigger is disabled.
   * @default false
   */
  disabled?: boolean
}

export interface TabsContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>, "forceMount"> {
  /**
   * Additional CSS class names to apply to the tab content.
   */
  className?: string
  /**
   * The value of the tab content.
   * Must match the value of the corresponding TabsTrigger.
   */
  value: string
  /**
   * Whether to force mounting the content when the tab is not active.
   * @default false
   */
  forceMount?: true
}
