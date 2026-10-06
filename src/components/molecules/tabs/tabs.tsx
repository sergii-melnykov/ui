"use client"

/**
 * Tabs component provides a way to organize content into separate views where only one view is visible at a time.
 * It follows the WAI-ARIA Tabs Pattern for accessibility.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/molecules-tabs--docs
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">
 *     <p>Account settings content</p>
 *   </TabsContent>
 *   <TabsContent value="password">
 *     <p>Password settings content</p>
 *   </TabsContent>
 * </Tabs>
 * ```
 */
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

import { TabsContentProps, TabsListProps, TabsProps, TabsTriggerProps } from "./tabs.types"
import { tabsListVariants, tabsTriggerVariants } from "./tabs.variants"

const Tabs = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  )
)
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps & VariantProps<typeof tabsListVariants>
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(tabsTriggerVariants(), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("mt-2 flex-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants }
