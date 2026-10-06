import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

export type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>
export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
export type PopoverAnchorProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>
export type PopoverHeaderProps = React.ComponentProps<"div">
export type PopoverTitleProps = React.ComponentProps<"p">
export type PopoverDescriptionProps = React.ComponentProps<"p">
