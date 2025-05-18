import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
  DropdownMenuPortal,
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
    await userEvent.click(trigger)

    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()

    await userEvent.click(trigger)

    expect(screen.queryByText("Item 1")).not.toBeInTheDocument()
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument()
  })

  it("handles checkbox items correctly", async () => {
    const handleCheckedChange = jest.fn()

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
    const handleValueChange = jest.fn()

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

    const trigger = screen.getByText("Open Menu")
    await userEvent.click(trigger)

    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" })
    expect(screen.getByText("Item 1")).toHaveFocus()

    fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" })
    expect(screen.getByText("Item 2")).toHaveFocus()

    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" })
    expect(screen.getByText("Item 1")).toHaveFocus()

    fireEvent.keyDown(document.activeElement!, { key: "Escape" })
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument()
  })

  it("handles shortcuts correctly", () => {
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

    const trigger = screen.getByText("Open Menu")
    fireEvent.click(trigger)

    expect(screen.getByText("⌘K")).toBeInTheDocument()
  })

  it("handles groups correctly", () => {
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

    const trigger = screen.getByText("Open Menu")
    fireEvent.click(trigger)

    expect(screen.getByText("Group 1")).toBeInTheDocument()
    expect(screen.getByText("Group 2")).toBeInTheDocument()
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
    expect(screen.getByText("Item 3")).toBeInTheDocument()
    expect(screen.getByText("Item 4")).toBeInTheDocument()
  })
})
