import { render, screen } from "@testing-library/react"
import { BadgeCheck } from "lucide-react"

import { Badge } from "./badge"

describe("Badge", () => {
  it("renders badge with text content", () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText("Test Badge")).toBeInTheDocument()
  })

  it("applies destructive variant classes", () => {
    render(<Badge variant="destructive">Destructive</Badge>)
    const badge = screen.getByText("Destructive")
    expect(badge).toHaveClass("bg-destructive/10")
    expect(badge).toHaveClass("text-destructive")
  })

  it("renders with child icon", () => {
    render(
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" data-testid="icon" />
        Verified
      </Badge>
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("Verified")).toBeInTheDocument()
  })

  it("renders as child link", () => {
    render(
      <Badge asChild>
        <a href="https://example.com">Open link</a>
      </Badge>
    )
    const link = screen.getByRole("link", { name: "Open link" })
    expect(link).toHaveAttribute("href", "https://example.com")
  })

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>)
    expect(screen.getByText("Custom")).toHaveClass("custom-class")
  })
})
