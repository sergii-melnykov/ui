import type { Meta, StoryObj } from "@storybook/react-vite"
import { Menu } from "lucide-react"

import { NavigationMenuDesignSpec } from "./navigation-menu-design-spec"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "./navigation-menu"
import { navigationMenuTriggerStyle } from "./navigation-menu.variants"
import { cn } from "@/utils/index"

const meta: Meta<typeof NavigationMenu> = {
  title: "Organisms/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the navigation menu"
    }
  }
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

const menuLinkClass =
  "block select-none space-y-1 rounded-md px-4 py-2 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"

export const DesignSpec: Story = {
  render: () => <NavigationMenuDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[392px] gap-1">
              <li>
                <NavigationMenuLink asChild>
                  <a className={menuLinkClass} href="/docs">
                    <div className="text-sm font-medium leading-none">Introduction</div>
                    <p className="text-sm leading-5 text-muted-foreground">
                      Re-usable components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a className={menuLinkClass} href="/docs/installation">
                    <div className="text-sm font-medium leading-none">Installation</div>
                    <p className="text-sm leading-5 text-muted-foreground">
                      How to install dependencies and structure your app.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a className={menuLinkClass} href="/docs/primitives/typography">
                    <div className="text-sm font-medium leading-none">Typography</div>
                    <p className="text-sm leading-5 text-muted-foreground">
                      Styles for headings, paragraphs, lists...etc
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1 md:grid-cols-2">
              {["Alert Dialog", "Hover Card", "Progress", "Scroll Area"].map((component) => (
                <li key={component}>
                  <NavigationMenuLink asChild>
                    <a
                      className={menuLinkClass}
                      href={`/docs/primitives/${component.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <div className="text-sm font-medium leading-none">{component}</div>
                      <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                        A reusable {component.toLowerCase()} component.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a className={cn(navigationMenuTriggerStyle(), "bg-transparent")} href="/docs">
              Docs
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a className={navigationMenuTriggerStyle()} href="/">
              Home
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a className={navigationMenuTriggerStyle()} href="/about">
              About
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a className={navigationMenuTriggerStyle()} href="/contact">
              Contact
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const Mobile: Story = {
  render: () => (
    <div className="w-[320px] rounded-lg border border-border p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col space-y-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger variant="mobile">
              Getting Started
              <Menu className="h-4 w-4" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1">
                <li>
                  <NavigationMenuLink asChild>
                    <a className={menuLinkClass} href="/docs">
                      <div className="text-sm font-medium leading-none">Documentation</div>
                      <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                        Learn how to use and customize our components.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger variant="mobile">
              Components
              <Menu className="h-4 w-4" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1">
                {["Button", "Card", "Dialog", "Dropdown"].map((component) => (
                  <li key={component}>
                    <NavigationMenuLink asChild>
                      <a
                        className={menuLinkClass}
                        href={`/components/${component.toLowerCase()}`}
                      >
                        <div className="text-sm font-medium leading-none">{component}</div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="block w-full py-4 text-base font-medium"
              href="https://github.com/shadcn/ui"
            >
              GitHub
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
