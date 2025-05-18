import { render, screen } from "@testing-library/react"
import { Badge } from "./badge"

describe("Badge", () => {
  it("renders badge with text content", () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText("Test Badge")).toBeInTheDocument()
  })

  it("applies variant classes", () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText("Success")
    expect(badge).toHaveClass("bg-green-500")
  })

  it("applies size classes", () => {
    render(<Badge size="lg">Large</Badge>)
    const badge = screen.getByText("Large")
    expect(badge).toHaveClass("h-6")
    expect(badge).toHaveClass("text-sm")
  })

  it("renders with icon", () => {
    const Icon = () => <span data-testid="icon">🚀</span>
    render(<Badge icon={<Icon />}>With Icon</Badge>)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("With Icon")).toBeInTheDocument()
  })

  it("renders with icon after", () => {
    const Icon = () => <span data-testid="icon">→</span>
    render(<Badge iconAfter={<Icon />}>With Icon After</Badge>)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("With Icon After")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>)
    expect(screen.getByText("Custom")).toHaveClass("custom-class")
  })
})
