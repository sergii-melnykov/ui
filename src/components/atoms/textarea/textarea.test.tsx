import { render, screen, fireEvent } from "@testing-library/react"
import { Textarea } from "./textarea"

describe("Textarea", () => {
  it("renders with default props", () => {
    render(<Textarea />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeInTheDocument()
  })

  it("handles disabled state", () => {
    render(<Textarea disabled />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeDisabled()
  })

  it("handles focus and blur events", () => {
    render(<Textarea />)
    const textarea = screen.getByRole("textbox")

    fireEvent.focus(textarea)
    expect(textarea).toHaveClass("ring-1")

    fireEvent.blur(textarea)
    expect(textarea).not.toHaveClass("ring-1")
  })

  it("handles auto-resize functionality", () => {
    render(<Textarea autoResize />)
    const textarea = screen.getByRole("textbox")

    // Mock scrollHeight
    Object.defineProperty(textarea, "scrollHeight", { value: 100 })

    fireEvent.input(textarea, { target: { value: "Test input" } })
    expect(textarea.style.height).toBe("100px")
  })

  it("handles maxLength constraint", () => {
    render(<Textarea maxLength={5} />)
    const textarea = screen.getByRole("textbox")

    fireEvent.input(textarea, { target: { value: "123456" } })
    expect(textarea).toHaveValue("12345")
  })

  it("handles minLength constraint", () => {
    render(<Textarea minLength={3} />)
    const textarea = screen.getByRole("textbox")

    fireEvent.input(textarea, { target: { value: "12" } })
    expect(textarea).toHaveAttribute("minLength", "3")
  })

  it("handles rows and cols attributes", () => {
    render(<Textarea rows={5} cols={50} />)
    const textarea = screen.getByRole("textbox")

    expect(textarea).toHaveAttribute("rows", "5")
    expect(textarea).toHaveAttribute("cols", "50")
  })
})
