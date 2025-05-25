import { render, screen, fireEvent } from "@testing-library/react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible"

describe("Collapsible", () => {
  it("renders correctly", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByText("Toggle")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("toggles content visibility when trigger is clicked", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )

    const trigger = screen.getByText("Toggle")
    const content = screen.getByText("Content")

    expect(content).toBeVisible()
    fireEvent.click(trigger)
    expect(content).not.toBeVisible()
    fireEvent.click(trigger)
    expect(content).toBeVisible()
  })

  it("applies custom className", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger className="custom-trigger">Toggle</CollapsibleTrigger>
        <CollapsibleContent className="custom-content">Content</CollapsibleContent>
      </Collapsible>
    )

    expect(screen.getByText("Toggle")).toHaveClass("custom-trigger")
    expect(screen.getByText("Content")).toHaveClass("custom-content")
  })
})
