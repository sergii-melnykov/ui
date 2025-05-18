import type { Meta, StoryObj } from "@storybook/react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "./navigation-menu"
import { Menu } from "lucide-react"

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

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/docs"
                  >
                    <div className="text-sm font-medium leading-none">Documentation</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn how to use and customize our components.
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
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {["Button", "Card", "Dialog", "Dropdown"].map((component) => (
                <li key={component}>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href={`/components/${component.toLowerCase()}`}
                    >
                      <div className="text-sm font-medium leading-none">{component}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
          <NavigationMenuLink className="font-medium" href="https://github.com/shadcn/ui">
            GitHub
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
          <NavigationMenuLink className="font-medium" href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="font-medium" href="/about">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="font-medium" href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const Mobile: Story = {
  render: () => (
    <div className="w-[320px] border border-border rounded-lg p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-col space-y-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger variant="mobile">
              Getting Started
              <Menu className="h-4 w-4" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      href="/docs"
                    >
                      <div className="text-sm font-medium leading-none">Documentation</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
              <ul className="grid gap-3 p-4">
                {["Button", "Card", "Dialog", "Dropdown"].map((component) => (
                  <li key={component}>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
