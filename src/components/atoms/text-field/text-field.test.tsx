import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TextField } from "./text-field"

describe("TextField", () => {
  it("renders with label", () => {
    render(<TextField label="Username" />)
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
  })

  it("renders with helper text", () => {
    render(<TextField label="Email" helperText="We'll never share your email" />)
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it("renders with error message", () => {
    render(<TextField label="Password" error="Password is required" />)
    expect(screen.getByText("Password is required")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("shows required indicator when required prop is true", () => {
    render(<TextField label="Username" required />)
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("applies full width class when fullWidth prop is true", () => {
    render(<TextField label="Username" fullWidth />)
    const container = screen.getByLabelText("Username").parentElement
    expect(container).toHaveClass("w-full")
  })

  it("handles disabled state correctly", () => {
    render(<TextField label="Username" disabled />)
    const input = screen.getByLabelText("Username")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:opacity-50")
  })

  it("handles user input correctly", async () => {
    const handleChange = jest.fn()
    render(<TextField label="Username" onChange={handleChange} />)

    const input = screen.getByLabelText("Username")
    await userEvent.type(input, "testuser")

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue("testuser")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<TextField label="Username" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("applies custom className", () => {
    render(<TextField label="Username" className="custom-class" />)
    expect(screen.getByLabelText("Username")).toHaveClass("custom-class")
  })

  it("handles focus and blur events", async () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()

    render(<TextField label="Username" onFocus={handleFocus} onBlur={handleBlur} />)

    const input = screen.getByLabelText("Username")

    await userEvent.click(input)
    expect(handleFocus).toHaveBeenCalled()

    await userEvent.tab()
    expect(handleBlur).toHaveBeenCalled()
  })

  it("generates unique id when not provided", () => {
    render(<TextField label="Username" />)
    const input = screen.getByLabelText("Username")
    expect(input.id).toMatch(/^text-field-/)
  })

  it("uses provided id when available", () => {
    render(<TextField label="Username" id="custom-id" />)
    const input = screen.getByLabelText("Username")
    expect(input).toHaveAttribute("id", "custom-id")
  })

  it("applies dark mode classes correctly", () => {
    render(<TextField label="Username" />)
    const input = screen.getByLabelText("Username")
    expect(input).toHaveClass("dark:border-gray-600", "dark:bg-gray-800", "dark:text-gray-100")
  })
})
