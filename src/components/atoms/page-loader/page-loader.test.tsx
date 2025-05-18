import { render, screen } from "@testing-library/react"
import { PageLoader } from "./page-loader"

describe("PageLoader", () => {
  it("renders without text", () => {
    render(<PageLoader />)
    const loader = screen.getByRole("alert")
    expect(loader).toBeInTheDocument()
  })

  it("renders with text", () => {
    const text = "Loading..."
    render(<PageLoader text={text} />)
    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const className = "custom-class"
    render(<PageLoader className={className} />)
    const loader = screen.getByRole("alert")
    expect(loader).toHaveClass(className)
  })

  it("renders with different sizes", () => {
    const { rerender } = render(<PageLoader size="sm" />)
    let loader = screen.getByRole("alert")
    expect(loader.querySelector("svg")).toHaveClass("h-4 w-4")

    rerender(<PageLoader size="lg" />)
    loader = screen.getByRole("alert")
    expect(loader.querySelector("svg")).toHaveClass("h-12 w-12")
  })

  it("renders with different theme colors", () => {
    const { rerender } = render(<PageLoader color="secondary" />)
    let loader = screen.getByRole("alert")
    expect(loader.querySelector("svg")).toHaveClass("text-secondary")

    rerender(<PageLoader color="destructive" />)
    loader = screen.getByRole("alert")
    expect(loader.querySelector("svg")).toHaveClass("text-destructive")
  })

  it("renders with custom color", () => {
    render(<PageLoader color="#FF5733" />)
    const loader = screen.getByRole("alert")
    expect(loader.querySelector("svg")).toHaveClass("text-[#FF5733]")
  })
})
