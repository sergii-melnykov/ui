import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./button"
import { Loader2 } from "lucide-react"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Button variant="default">Default</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-primary")

    rerender(<Button variant="destructive">Destructive</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-destructive")

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole("button")).toHaveClass("border-input")

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole("button")).toHaveClass("bg-secondary")

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent")

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByRole("button")).toHaveClass("text-primary")
  })

  it("applies size classes correctly", () => {
    const { rerender } = render(<Button size="default">Default</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-9")

    rerender(<Button size="sm">Small</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-8")

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-10")

    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-9 w-9")
  })

  it("handles click events", async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
    expect(screen.getByRole("button")).toHaveClass("disabled:opacity-50")
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })

  it("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    )
    expect(screen.getByRole("link")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/")
  })

  it("renders start icon correctly", () => {
    const StartIcon = () => <span data-testid="start-icon">★</span>
    render(<Button startIcon={<StartIcon />}>With Start Icon</Button>)

    expect(screen.getByTestId("start-icon")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("With Start Icon")
  })

  it("renders end icon correctly", () => {
    const EndIcon = () => <span data-testid="end-icon">★</span>
    render(<Button endIcon={<EndIcon />}>With End Icon</Button>)

    expect(screen.getByTestId("end-icon")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("With End Icon")
  })

  it("renders both start and end icons correctly", () => {
    const StartIcon = () => <span data-testid="start-icon">★</span>
    const EndIcon = () => <span data-testid="end-icon">★</span>

    render(
      <Button startIcon={<StartIcon />} endIcon={<EndIcon />}>
        With Both Icons
      </Button>
    )

    expect(screen.getByTestId("start-icon")).toBeInTheDocument()
    expect(screen.getByTestId("end-icon")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("With Both Icons")
  })

  it("shows loading state correctly", () => {
    render(<Button loading>Loading</Button>)

    const button = screen.getByRole("button")
    const spinner = screen.getByRole("status")

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent("Loading")
    expect(spinner).toHaveAttribute("aria-label", "Loading")
  })

  it("hides icons when in loading state", () => {
    const StartIcon = () => <span data-testid="start-icon">★</span>
    const EndIcon = () => <span data-testid="end-icon">★</span>

    render(
      <Button startIcon={<StartIcon />} endIcon={<EndIcon />} loading>
        Loading
      </Button>
    )

    expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument()
    expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading")
  })

  it("prevents click events when loading", async () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} loading>
        Loading
      </Button>
    )

    await userEvent.click(screen.getByRole("button"))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
