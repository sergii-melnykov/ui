import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A tabs component that follows the WAI-ARIA Tabs Pattern for accessibility."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: "account"
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="text-sm text-muted-foreground">Configure your application preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export const Disabled: Story = {
  args: {
    defaultValue: "account"
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="text-sm text-muted-foreground">Configure your application preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export const CustomStyling: Story = {
  args: {
    defaultValue: "account"
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList className="bg-primary/10">
        <TabsTrigger
          value="account"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Password
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="text-sm text-muted-foreground">Configure your application preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
