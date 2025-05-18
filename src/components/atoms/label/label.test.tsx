import * as React from "react"
import { render, screen } from "@testing-library/react"
import { Label } from "./label"

describe("Label", () => {
  it("renders correctly", () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText("Test Label")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Label className="custom-class">Test Label</Label>)
    expect(screen.getByText("Test Label")).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Test Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })
})
