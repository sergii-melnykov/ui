import { render, screen } from "@testing-library/react"

import { Spinner } from "./spinner"

describe("Spinner", () => {
  it("exposes loading status for assistive technologies", () => {
    render(<Spinner data-testid="spinner" />)
    const spinner = screen.getByTestId("spinner")
    expect(spinner).toHaveAttribute("role", "status")
    expect(spinner).toHaveAttribute("aria-label", "Loading")
  })

  it("applies default size and spin animation", () => {
    render(<Spinner data-testid="spinner" />)
    expect(screen.getByTestId("spinner")).toHaveClass("size-4", "animate-spin")
  })

  it("merges custom className for size and color", () => {
    render(<Spinner data-testid="spinner" className="size-6 text-primary" />)
    const spinner = screen.getByTestId("spinner")
    expect(spinner).toHaveClass("size-6", "text-primary", "animate-spin")
  })
})
