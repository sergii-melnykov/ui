import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders correctly", () => {
    render(<Checkbox />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("handles checked state", async () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole("checkbox")
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it("handles disabled state", () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("handles aria-label", () => {
    render(<Checkbox aria-label="Test checkbox" />)
    expect(screen.getByLabelText("Test checkbox")).toBeInTheDocument()
  })
})
