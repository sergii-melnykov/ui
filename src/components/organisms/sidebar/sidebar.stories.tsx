import type { Meta, StoryObj } from "@storybook/react"
import {
  Home,
  Settings,
  Users,
  FileText,
  MessageSquare,
  Bell,
  Search,
  Plus,
  ChevronDown
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "./sidebar"

/**
 * A flexible sidebar component that supports various layouts and configurations.
 * The sidebar can be positioned on either side of the screen and supports different
 * visual styles and collapse behaviors.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs-organisms-sidebar--docs
 */
const meta = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A flexible sidebar component that supports various layouts and configurations.
The sidebar can be positioned on either side of the screen and supports different
visual styles and collapse behaviors.

## Features
- Multiple variants: sidebar, floating, inset
- Collapsible modes: offcanvas, icon, none
- Left/right positioning
- Mobile responsive
- Keyboard shortcuts (Ctrl/Cmd + B)
- Persistent state via cookies
- Nested navigation support
- Action buttons with tooltips
- Search functionality
- Customizable styling
        `
      }
    }
  },
  argTypes: {
    side: {
      description: "The side of the screen where the sidebar appears",
      control: "select",
      options: ["left", "right"],
      defaultValue: "left",
      table: {
        type: { summary: "left | right" },
        defaultValue: { summary: "left" }
      }
    },
    variant: {
      description: "The visual style of the sidebar",
      control: "select",
      options: ["sidebar", "floating", "inset"],
      defaultValue: "sidebar",
      table: {
        type: { summary: "sidebar | floating | inset" },
        defaultValue: { summary: "sidebar" }
      }
    },
    collapsible: {
      description: "How the sidebar can be collapsed",
      control: "select",
      options: ["offcanvas", "icon", "none"],
      defaultValue: "offcanvas",
      table: {
        type: { summary: "offcanvas | icon | none" },
        defaultValue: { summary: "offcanvas" }
      }
    }
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Story />
          <main className="flex-1 p-4">
            <h1 className="text-2xl font-bold">Main Content</h1>
            <p className="mt-4">
              This is the main content area. The sidebar can be toggled using the trigger button or
              by pressing Ctrl/Cmd + B.
            </p>
          </main>
        </div>
      </SidebarProvider>
    )
  ]
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof Sidebar>

/**
 * Default sidebar with basic navigation items.
 * Demonstrates the standard layout with header, content, and footer sections.
 */
export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                <MessageSquare />
                <span>Messages</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Documents">
                <FileText />
                <span>Documents</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Team">
                <Users />
                <span>Team</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Notifications">
                <Bell />
                <span>Notifications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

/**
 * Floating sidebar variant with a modern, elevated appearance.
 * Demonstrates the floating style with rounded corners and shadow.
 */
export const Floating: Story = {
  render: () => (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                <MessageSquare />
                <span>Messages</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * Inset sidebar variant that integrates with the main content area.
 * Demonstrates the inset style with a seamless connection to the content.
 */
export const Inset: Story = {
  render: () => (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                <MessageSquare />
                <span>Messages</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * Right-aligned sidebar variant.
 * Demonstrates the sidebar positioned on the right side of the screen.
 */
export const RightSide: Story = {
  render: () => (
    <Sidebar side="right">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <SidebarTrigger />
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="New Message">
                <MessageSquare />
                <span>New Message</span>
                <SidebarMenuBadge>New</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="System Update">
                <Settings />
                <span>System Update</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * Sidebar with nested navigation items.
 * Demonstrates the use of sub-menus for hierarchical navigation.
 */
export const WithNestedNavigation: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Documents">
                  <FileText />
                  <span>Documents</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Recent</SidebarMenuSubButton>
                <SidebarMenuSubButton>Shared</SidebarMenuSubButton>
                <SidebarMenuSubButton>Starred</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * Sidebar with action buttons.
 * Demonstrates the use of action buttons in menu items.
 */
export const WithActions: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Project 1">
                <FileText />
                <span>Project 1</span>
              </SidebarMenuButton>
              <SidebarMenuAction tooltip="Add Task">
                <Plus className="h-4 w-4" />
              </SidebarMenuAction>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Project 2">
                <FileText />
                <span>Project 2</span>
              </SidebarMenuButton>
              <SidebarMenuAction tooltip="Add Task">
                <Plus className="h-4 w-4" />
              </SidebarMenuAction>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * Sidebar with icon-only collapsible mode.
 * Demonstrates the icon-only collapse behavior.
 */
export const IconOnly: Story = {
  render: () => (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                <MessageSquare />
                <span>Messages</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

/**
 * Non-collapsible sidebar variant.
 * Demonstrates a fixed sidebar that cannot be collapsed.
 */
export const NonCollapsible: Story = {
  render: () => (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                <MessageSquare />
                <span>Messages</span>
                <SidebarMenuBadge>3</SidebarMenuBadge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
