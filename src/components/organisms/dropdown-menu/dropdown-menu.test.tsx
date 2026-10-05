import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from "./dropdown-menu"

describe("DropdownMenu", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.getByText("Open Menu")).toBeInTheDocument()
  })

  it("opens and closes on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByText("Open Menu")
    await user.click(trigger)

    expect(await screen.findByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()

    await user.keyboard("{Escape}")

    await waitFor(() => {
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument()
    })
  })

  it("handles checkbox items correctly", async () => {
    const handleCheckedChange = vi.fn()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={handleCheckedChange}>
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByText("Open Menu")
    await userEvent.click(trigger)

    const checkboxItem = screen.getByText("Checkbox Item")
    await userEvent.click(checkboxItem)

    expect(handleCheckedChange).toHaveBeenCalledWith(true)
  })

  it("handles radio items correctly", async () => {
    const handleValueChange = vi.fn()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1" onValueChange={handleValueChange}>
            <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByText("Open Menu")
    await userEvent.click(trigger)

    const option2 = screen.getByText("Option 2")
    await userEvent.click(option2)

    expect(handleValueChange).toHaveBeenCalledWith("option2")
  })

  it("handles sub menus correctly", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByText("Open Menu")
    await userEvent.click(trigger)

    const subTrigger = screen.getByText("Sub Menu")
    await userEvent.click(subTrigger)

    expect(screen.getByText("Sub Item 1")).toBeInTheDocument()
    expect(screen.getByText("Sub Item 2")).toBeInTheDocument()
  })

  it("handles disabled items correctly", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    const trigger = screen.getByText("Open Menu")
    await userEvent.click(trigger)

    const disabledItem = screen.getByText("Disabled Item")
    expect(disabledItem).toHaveAttribute("data-disabled")
  })

  it("handles keyboard navigation correctly", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText("Open Menu"))
    const items = await screen.findAllByRole("menuitem")
    expect(items).toHaveLength(3)

    items[0].focus()
    expect(items[0]).toHaveFocus()

    fireEvent.keyDown(items[0], { key: "ArrowDown" })
    expect(items[1]).toHaveFocus()

    fireEvent.keyDown(items[1], { key: "Escape" })
    await waitFor(() => {
      expect(screen.queryByRole("menuitem")).not.toBeInTheDocument()
    })
  })

  it("handles shortcuts correctly", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Item with Shortcut
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText("Open Menu"))
    expect(await screen.findByText("⌘K")).toBeInTheDocument()
  })

  it("handles groups correctly", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 1</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 2</DropdownMenuLabel>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
            <DropdownMenuItem>Item 4</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByText("Open Menu"))

    expect(await screen.findByText("Group 1")).toBeInTheDocument()
    expect(screen.getByText("Group 2")).toBeInTheDocument()
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 4")).toBeInTheDocument()
  })
})
