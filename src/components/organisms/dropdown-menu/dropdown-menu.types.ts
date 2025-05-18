import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { type VariantProps } from "class-variance-authority"
import { dropdownMenuTriggerStyle } from "./dropdown-menu.variants"

export type DropdownMenuTriggerVariants = VariantProps<typeof dropdownMenuTriggerStyle>

export interface DropdownMenuProps {
  /**
   * The content of the dropdown menu
   */
  children: React.ReactNode
  /**
   * The open state of the dropdown menu
   */
  open?: boolean
  /**
   * The default open state of the dropdown menu
   */
  defaultOpen?: boolean
  /**
   * The controlled open state of the dropdown menu
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The modal state of the dropdown menu
   */
  modal?: boolean
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    DropdownMenuTriggerVariants {
  /**
   * The content of the trigger
   */
  children: React.ReactNode
  /**
   * The variant of the trigger
   */
  variant?: DropdownMenuTriggerVariants["variant"]
  /**
   * The size of the trigger
   */
  size?: DropdownMenuTriggerVariants["size"]
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu
   */
  children: React.ReactNode
  /**
   * The side offset of the dropdown menu
   */
  sideOffset?: number
  /**
   * The align offset of the dropdown menu
   */
  alignOffset?: number
  /**
   * The side of the dropdown menu
   */
  side?: "top" | "right" | "bottom" | "left"
  /**
   * The alignment of the dropdown menu
   */
  align?: "start" | "center" | "end"
  /**
   * The collision padding of the dropdown menu
   */
  collisionPadding?: number
  /**
   * The collision boundary of the dropdown menu
   */
  collisionBoundary?: Element | null | Array<Element | null>
  /**
   * The arrow padding of the dropdown menu
   */
  arrowPadding?: number
  /**
   * The sticky state of the dropdown menu
   */
  sticky?: "partial" | "always"
  /**
   * The hide when detached state of the dropdown menu
   */
  hideWhenDetached?: boolean
  /**
   * The update position strategy of the dropdown menu
   */
  updatePositionStrategy?: "optimized" | "always"
  /**
   * The force mount state of the dropdown menu
   */
  forceMount?: boolean
  /**
   * The container of the dropdown menu
   */
  container?: HTMLElement
}

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu item
   */
  children: React.ReactNode
  /**
   * The inset state of the dropdown menu item
   */
  inset?: boolean
  /**
   * The disabled state of the dropdown menu item
   */
  disabled?: boolean
  /**
   * The selected state of the dropdown menu item
   */
  selected?: boolean
}

export interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu checkbox item
   */
  children: React.ReactNode
  /**
   * The checked state of the dropdown menu checkbox item
   */
  checked?: boolean
  /**
   * The disabled state of the dropdown menu checkbox item
   */
  disabled?: boolean
  /**
   * The on checked change handler of the dropdown menu checkbox item
   */
  onCheckedChange?: (checked: boolean) => void
}

export interface DropdownMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu radio item
   */
  children: React.ReactNode
  /**
   * The value of the dropdown menu radio item
   */
  value: string
  /**
   * The disabled state of the dropdown menu radio item
   */
  disabled?: boolean
}

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu label
   */
  children: React.ReactNode
  /**
   * The inset state of the dropdown menu label
   */
  inset?: boolean
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content of the dropdown menu shortcut
   */
  children: React.ReactNode
}

export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu group
   */
  children: React.ReactNode
}

export interface DropdownMenuPortalProps {
  /**
   * The content of the dropdown menu portal
   */
  children: React.ReactNode
  /**
   * The container of the dropdown menu portal
   */
  container?: HTMLElement
}

export interface DropdownMenuSubProps {
  /**
   * The content of the dropdown menu sub
   */
  children: React.ReactNode
  /**
   * The open state of the dropdown menu sub
   */
  open?: boolean
  /**
   * The default open state of the dropdown menu sub
   */
  defaultOpen?: boolean
  /**
   * The controlled open state of the dropdown menu sub
   */
  onOpenChange?: (open: boolean) => void
}

export interface DropdownMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu sub content
   */
  children: React.ReactNode
  /**
   * The side offset of the dropdown menu sub content
   */
  sideOffset?: number
  /**
   * The align offset of the dropdown menu sub content
   */
  alignOffset?: number
  /**
   * The side of the dropdown menu sub content
   */
  side?: "top" | "right" | "bottom" | "left"
  /**
   * The alignment of the dropdown menu sub content
   */
  align?: "start" | "center" | "end"
  /**
   * The collision padding of the dropdown menu sub content
   */
  collisionPadding?: number
  /**
   * The collision boundary of the dropdown menu sub content
   */
  collisionBoundary?: Element | null | Array<Element | null>
  /**
   * The arrow padding of the dropdown menu sub content
   */
  arrowPadding?: number
  /**
   * The sticky state of the dropdown menu sub content
   */
  sticky?: "partial" | "always"
  /**
   * The hide when detached state of the dropdown menu sub content
   */
  hideWhenDetached?: boolean
  /**
   * The update position strategy of the dropdown menu sub content
   */
  updatePositionStrategy?: "optimized" | "always"
  /**
   * The force mount state of the dropdown menu sub content
   */
  forceMount?: boolean
  /**
   * The container of the dropdown menu sub content
   */
  container?: HTMLElement
}

export interface DropdownMenuSubTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the dropdown menu sub trigger
   */
  children: React.ReactNode
  /**
   * The inset state of the dropdown menu sub trigger
   */
  inset?: boolean
  /**
   * The disabled state of the dropdown menu sub trigger
   */
  disabled?: boolean
}

export interface DropdownMenuRadioGroupProps {
  /**
   * The content of the dropdown menu radio group
   */
  children: React.ReactNode
  /**
   * The value of the dropdown menu radio group
   */
  value?: string
  /**
   * The default value of the dropdown menu radio group
   */
  defaultValue?: string
  /**
   * The controlled value of the dropdown menu radio group
   */
  onValueChange?: (value: string) => void
}
