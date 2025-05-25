import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RadioGroup, RadioGroupItem } from "./radio-group"

describe("RadioGroup", () => {
  it("renders correctly", () => {
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1">Option 1</RadioGroupItem>
        <RadioGroupItem value="option-2">Option 2</RadioGroupItem>
      </RadioGroup>
    )

    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
    expect(screen.getAllByRole("radio")).toHaveLength(2)
  })

  it("handles selection correctly", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup defaultValue="option-1">
        <RadioGroupItem value="option-1">Option 1</RadioGroupItem>
        <RadioGroupItem value="option-2">Option 2</RadioGroupItem>
      </RadioGroup>
    )

    const radioButtons = screen.getAllByRole("radio")
    expect(radioButtons[0]).toBeChecked()
    expect(radioButtons[1]).not.toBeChecked()

    await user.click(radioButtons[1])
    expect(radioButtons[0]).not.toBeChecked()
    expect(radioButtons[1]).toBeChecked()
  })

  it("applies custom className", () => {
    render(
      <RadioGroup className="custom-class">
        <RadioGroupItem value="option-1">Option 1</RadioGroupItem>
      </RadioGroup>
    )

    expect(screen.getByRole("radiogroup")).toHaveClass("custom-class")
  })
})
