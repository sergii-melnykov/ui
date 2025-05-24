import * as React from "react"
import { VariantProps } from "class-variance-authority"
import { TooltipContent } from "@/components/atoms/tooltip"
import { sidebarMenuButtonVariants } from "./sidebar"

/**
 * Context props for the Sidebar component that manages its state and behavior.
 * This context provides the necessary state and methods to control the sidebar's
 * expansion, collapse, and mobile responsiveness.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 */
export type SidebarContextProps = {
  /** Current state of the sidebar - either expanded or collapsed */
  state: "expanded" | "collapsed"
  /** Whether the sidebar is currently open */
  open: boolean
  /** Function to control the sidebar's open state */
  setOpen: (open: boolean) => void
  /** Whether the mobile sidebar is currently open */
  openMobile: boolean
  /** Function to control the mobile sidebar's open state */
  setOpenMobile: (open: boolean) => void
  /** Whether the sidebar is being viewed on a mobile device */
  isMobile: boolean
  /** Function to toggle the sidebar's state */
  toggleSidebar: () => void
}

/**
 * Props for the main Sidebar component.
 * Extends the base div props and adds sidebar-specific configuration options.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <Sidebar
 *   side="left"
 *   variant="sidebar"
 *   collapsible="icon"
 * >
 *   <SidebarContent>...</SidebarContent>
 * </Sidebar>
 * ```
 */
export type SidebarProps = React.ComponentProps<"div"> & {
  /** Position of the sidebar relative to the main content */
  side?: "left" | "right"
  /** Visual style variant of the sidebar */
  variant?: "sidebar" | "floating" | "inset"
  /** Collapse behavior of the sidebar */
  collapsible?: "offcanvas" | "icon" | "none"
}

/**
 * Props for the SidebarProvider component that manages sidebar state.
 * Provides controlled and uncontrolled state management options.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarProvider defaultOpen={true}>
 *   <Sidebar>...</Sidebar>
 * </SidebarProvider>
 * ```
 */
export type SidebarProviderProps = React.ComponentProps<"div"> & {
  /** Initial open state for uncontrolled usage */
  defaultOpen?: boolean
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}

/**
 * Props for the SidebarMenuButton component.
 * Extends button props with additional styling and behavior options.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarMenuButton
 *   isActive={true}
 *   tooltip="Dashboard"
 * >
 *   <DashboardIcon />
 * </SidebarMenuButton>
 * ```
 */
export type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  /** Whether to render as a child component */
  asChild?: boolean
  /** Whether the button is currently active */
  isActive?: boolean
  /** Tooltip content or configuration */
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>

/**
 * Props for the SidebarMenuAction component.
 * Used for action buttons within the sidebar menu.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarMenuAction showOnHover>
 *   <PlusIcon />
 * </SidebarMenuAction>
 * ```
 */
export type SidebarMenuActionProps = React.ComponentProps<"button"> & {
  /** Whether to render as a child component */
  asChild?: boolean
  /** Whether to only show the action on hover */
  showOnHover?: boolean
}

/**
 * Props for the SidebarMenuSubButton component.
 * Used for secondary navigation items within the sidebar.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarMenuSubButton
 *   size="sm"
 *   isActive={true}
 *   href="/settings/profile"
 * >
 *   Profile Settings
 * </SidebarMenuSubButton>
 * ```
 */
export type SidebarMenuSubButtonProps = React.ComponentProps<"a"> & {
  /** Whether to render as a child component */
  asChild?: boolean
  /** Size variant of the sub-button */
  size?: "sm" | "md"
  /** Whether the sub-button is currently active */
  isActive?: boolean
}

/**
 * Props for the SidebarMenuSkeleton component.
 * Used to show loading states in the sidebar menu.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarMenuSkeleton showIcon />
 * ```
 */
export type SidebarMenuSkeletonProps = React.ComponentProps<"div"> & {
  /** Whether to show an icon skeleton */
  showIcon?: boolean
}

/**
 * Props for the SidebarGroupLabel component.
 * Used to display section labels within the sidebar.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 * ```
 */
export type SidebarGroupLabelProps = React.ComponentProps<"div"> & {
  /** Whether to render as a child component */
  asChild?: boolean
}

/**
 * Props for the SidebarGroupAction component.
 * Used for action buttons within sidebar groups.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/organisms-sidebar--docs
 *
 * @example
 * ```tsx
 * <SidebarGroupAction>
 *   <SettingsIcon />
 * </SidebarGroupAction>
 * ```
 */
export type SidebarGroupActionProps = React.ComponentProps<"button"> & {
  /** Whether to render as a child component */
  asChild?: boolean
}
