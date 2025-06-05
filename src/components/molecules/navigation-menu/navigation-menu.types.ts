import React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { VariantProps } from "class-variance-authority"
import { navigationMenuTriggerStyle } from "./navigation-menu.variants"

export interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  /**
   * The content of the navigation menu
   */
  children: React.ReactNode
  /**
   * Optional className for the root element
   */
  className?: string
}

export interface NavigationMenuListProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {
  /**
   * Optional className for the list element
   */
  className?: string
}

export interface NavigationMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {
  /**
   * Optional className for the item element
   */
  className?: string
}

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>,
    VariantProps<typeof navigationMenuTriggerStyle> {
  /**
   * Optional className for the trigger element
   */
  className?: string
}

export interface NavigationMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {
  /**
   * Optional className for the content element
   */
  className?: string
}

export interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  /**
   * Optional className for the link element
   */
  className?: string
}

export interface NavigationMenuViewportProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {
  /**
   * Optional className for the viewport element
   */
  className?: string
}

export interface NavigationMenuIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> {
  /**
   * Optional className for the indicator element
   */
  className?: string
}
