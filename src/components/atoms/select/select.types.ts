import * as SelectPrimitive from "@radix-ui/react-select"

export interface SelectProps extends SelectPrimitive.SelectProps {
  multiple?: boolean
}

export interface SelectValueProps extends SelectPrimitive.SelectValueProps {
  multiple?: boolean
}

export type SelectTriggerProps = SelectPrimitive.SelectTriggerProps

export type SelectContentProps = SelectPrimitive.SelectContentProps

export type SelectItemProps = SelectPrimitive.SelectItemProps

export type SelectLabelProps = SelectPrimitive.SelectLabelProps

export type SelectSeparatorProps = SelectPrimitive.SelectSeparatorProps

export type SelectGroupProps = SelectPrimitive.SelectGroupProps

export type SelectScrollUpButtonProps = SelectPrimitive.SelectScrollUpButtonProps

export type SelectScrollDownButtonProps = SelectPrimitive.SelectScrollDownButtonProps
