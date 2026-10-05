import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { type ComponentPropsWithoutRef, type ComponentRef } from "react"
import { type Command as CommandPrimitive } from "cmdk"

export type CommandProps = ComponentPropsWithoutRef<typeof CommandPrimitive>
export type CommandRef = ComponentRef<typeof CommandPrimitive>

export type CommandDialogProps = DialogProps

export type CommandInputProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
export type CommandInputRef = ComponentRef<typeof CommandPrimitive.Input>

export type CommandListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>
export type CommandListRef = ComponentRef<typeof CommandPrimitive.List>

export type CommandEmptyProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
export type CommandEmptyRef = ComponentRef<typeof CommandPrimitive.Empty>

export type CommandGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
export type CommandGroupRef = ComponentRef<typeof CommandPrimitive.Group>

export type CommandSeparatorProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
export type CommandSeparatorRef = ComponentRef<typeof CommandPrimitive.Separator>

export type CommandItemProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
export type CommandItemRef = ComponentRef<typeof CommandPrimitive.Item>

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>
