import type { Meta, StoryObj } from "@storybook/react-vite"
import { AppWindow, Code } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"

import { TabsDesignSpec } from "./tabs-design-spec"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

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
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"]
    },
    dir: {
      control: "select",
      options: ["ltr", "rtl"]
    }
  }
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const DesignSpec: Story = {
  render: () => <TabsDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  args: {
    defaultValue: "account"
  },
  render: (args) => (
    <Tabs {...args} className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Configure your application preferences.</p>
      </TabsContent>
    </Tabs>
  )
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-[120px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindow aria-hidden />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <Code aria-hidden />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl" className="w-[400px]">
      <Tabs defaultValue="overview" dir="rtl">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader className="items-end text-right">
              <CardTitle>نظرة عامة</CardTitle>
              <CardDescription>عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة.</CardDescription>
            </CardHeader>
            <CardContent className="text-right text-sm text-muted-foreground">
              لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
