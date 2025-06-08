import { render, screen } from "@testing-library/react"
import { ScrollArea } from "./scroll-area"

describe("ScrollArea", () => {
  it("renders children correctly", () => {
    render(
      <ScrollArea>
        <div data-testid="test-content">Test Content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId("test-content")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <ScrollArea className="custom-class">
        <div>Test Content</div>
      </ScrollArea>
    )
    expect(container.firstChild).toHaveClass("custom-class")
  })

  it("renders with ScrollBar", () => {
    const { container } = render(
      <ScrollArea>
        <div>Test Content</div>
      </ScrollArea>
    )
    expect(container.querySelector('[data-orientation="vertical"]')).toBeInTheDocument()
  })
})
