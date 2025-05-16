import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "./Button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("handles click events", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Button variant="primary">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-primary")

    rerender(<Button variant="secondary">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-secondary")

    rerender(<Button variant="outline">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("border")

    rerender(<Button variant="ghost">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent")
  })

  it("applies size classes correctly", () => {
    const { rerender } = render(<Button size="sm">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-9")

    rerender(<Button size="md">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-10")

    rerender(<Button size="lg">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-11")
  })

  it("shows loading state correctly", () => {
    render(<Button isLoading>Button</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true")
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument()
  })

  it("handles disabled state correctly", () => {
    render(<Button isDisabled>Button</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true")
  })

  it("merges custom className correctly", () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })
})
