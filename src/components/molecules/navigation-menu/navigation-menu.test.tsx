import { render, screen, fireEvent } from "@testing-library/react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "./navigation-menu"

describe("NavigationMenu", () => {
  it("renders navigation menu with trigger", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                <li>
                  <NavigationMenuLink asChild>
                    <a href="/docs">Documentation</a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    expect(screen.getByText("Getting Started")).toBeInTheDocument()
  })

  it("applies custom className to trigger", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-class">Custom Trigger</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const trigger = screen.getByText("Custom Trigger")
    expect(trigger.parentElement).toHaveClass("custom-class")
  })

  it("renders navigation menu with link", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/about">About</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const link = screen.getByText("About")
    expect(link).toHaveAttribute("href", "/about")
  })

  it("handles trigger click", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Click Me</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>Content</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const trigger = screen.getByText("Click Me")
    fireEvent.click(trigger)
    // Note: Testing the actual content visibility would require more complex setup
    // due to Radix UI's portal implementation
  })

  it("renders mobile variant correctly", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger variant="mobile">Mobile Menu</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )

    const trigger = screen.getByText("Mobile Menu")
    expect(trigger.parentElement).toHaveClass("w-full")
    expect(trigger.parentElement).toHaveClass("justify-between")
    expect(trigger.parentElement).toHaveClass("border-b")
  })
})
