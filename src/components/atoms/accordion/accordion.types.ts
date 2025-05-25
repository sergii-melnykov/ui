import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

/**
 * Props for a single-item accordion
 */
type AccordionSingleProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  /** The type of accordion - must be "single" for this variant */
  type: "single"
  /** The default value of the accordion item */
  defaultValue?: string
  /** The controlled value of the accordion item */
  value?: string
  /** Callback fired when the value changes */
  onValueChange?: (_value: string) => void
  /** Whether the accordion item can be collapsed */
  collapsible?: boolean
}

/**
 * Props for a multiple-item accordion
 */
type AccordionMultipleProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  /** The type of accordion - must be "multiple" for this variant */
  type: "multiple"
  /** The default values of the accordion items */
  defaultValue?: string[]
  /** The controlled values of the accordion items */
  value?: string[]
  /** Callback fired when the values change */
  onValueChange?: (_value: string[]) => void
}

/**
 * Props for the Accordion component
 */
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

/**
 * Props for an individual accordion item
 */
export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** The value of the accordion item */
  value: string
}

/**
 * Props for the accordion trigger button
 */
export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** The content of the accordion trigger */
  children: React.ReactNode
}

/**
 * Props for the accordion content panel
 */
export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  /** The content of the accordion panel */
  children: React.ReactNode
}
