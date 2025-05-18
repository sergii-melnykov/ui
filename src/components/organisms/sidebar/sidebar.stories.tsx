import type { Meta, StoryObj } from "@storybook/react"
import { Home, Settings, Users, FileText, MessageSquare, Bell, Search } from "lucide-react"

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
  SidebarTrigger
} from "./sidebar"

/**
 * A flexible sidebar component that supports various layouts and configurations.
 * The sidebar can be positioned on either side of the screen and supports different
 * visual styles and collapse behaviors.
 */
const meta = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A flexible sidebar component that supports various layouts and configurations."
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
