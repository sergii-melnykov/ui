import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { DropdownMenu } from "./dropdown-menu"

// Mock next/link
jest.mock("next/link", () => {
  return ({
    children,
    href,
    className
  }: {
    children: React.ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
})

describe("DropdownMenu", () => {
  const mockItems = [
    { label: "Edit", onClick: jest.fn() },
    { label: "Delete", onClick: jest.fn(), disabled: true },
    { label: "Share", onClick: jest.fn() }
  ]

  it("renders with default trigger", () => {
    render(<DropdownMenu items={mockItems} />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders with custom trigger", () => {
    render(<DropdownMenu items={mockItems} trigger={<button>Custom Trigger</button>} />)
    expect(screen.getByText("Custom Trigger")).toBeInTheDocument()
  })

  it("opens menu on trigger click", () => {
    render(<DropdownMenu items={mockItems} />)
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("Edit")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
    expect(screen.getByText("Share")).toBeInTheDocument()
  })

  it("calls onClick handler when menu item is clicked", () => {
    render(<DropdownMenu items={mockItems} />)
    fireEvent.click(screen.getByRole("button"))
    fireEvent.click(screen.getByText("Edit"))
    expect(mockItems[0].onClick).toHaveBeenCalled()
  })

  it("disables menu items when disabled prop is true", () => {
    render(<DropdownMenu items={mockItems} />)
    fireEvent.click(screen.getByRole("button"))
    const deleteItem = screen.getByText("Delete")
    expect(deleteItem).toHaveAttribute("data-disabled")
  })

  it("renders menu items with icons", () => {
    const itemsWithIcons = [{ label: "Edit", onClick: jest.fn(), icon: <span>📝</span> }]
    render(<DropdownMenu items={itemsWithIcons} />)
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("📝")).toBeInTheDocument()
  })

  it("renders menu items with links", () => {
    const itemsWithLinks = [
      { label: "Documentation", href: "/docs" },
      { label: "GitHub", href: "https://github.com" }
    ]
    render(<DropdownMenu items={itemsWithLinks} />)
    fireEvent.click(screen.getByRole("button"))

    const docLink = screen.getByText("Documentation")
    const githubLink = screen.getByText("GitHub")

    expect(docLink.closest("a")).toHaveAttribute("href", "/docs")
    expect(githubLink.closest("a")).toHaveAttribute("href", "https://github.com")
  })

  it("applies custom className", () => {
    render(<DropdownMenu items={mockItems} className="custom-class" />)
    expect(screen.getByRole("button").parentElement).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DropdownMenu items={mockItems} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
