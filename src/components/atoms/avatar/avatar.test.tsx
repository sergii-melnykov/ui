import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Avatar } from "./avatar"

describe("Avatar", () => {
  it("renders with image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar" />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg")
    expect(img).toHaveAttribute("alt", "User avatar")
  })

  it("renders fallback text when no src is provided", () => {
    render(<Avatar fallback="John Doe" />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders fallback text when image fails to load", () => {
    render(<Avatar src="invalid-url.jpg" fallback="John Doe" />)
    const img = screen.getByRole("img")
    fireEvent.error(img)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("applies correct size classes", () => {
    const { rerender } = render(<Avatar size="sm" fallback="JD" />)
    expect(screen.getByText("JD").parentElement).toHaveClass("h-8 w-8 text-xs")

    rerender(<Avatar size="md" fallback="JD" />)
    expect(screen.getByText("JD").parentElement).toHaveClass("h-10 w-10 text-sm")

    rerender(<Avatar size="lg" fallback="JD" />)
    expect(screen.getByText("JD").parentElement).toHaveClass("h-12 w-12 text-base")

    rerender(<Avatar size="xl" fallback="JD" />)
    expect(screen.getByText("JD").parentElement).toHaveClass("h-16 w-16 text-lg")
  })

  it("applies rounded class by default", () => {
    render(<Avatar fallback="JD" />)
    expect(screen.getByText("JD").parentElement).toHaveClass("rounded-full")
  })

  it("applies square class when rounded is false", () => {
    render(<Avatar fallback="JD" rounded={false} />)
    expect(screen.getByText("JD").parentElement).toHaveClass("rounded-md")
  })

  it("applies custom className", () => {
    render(<Avatar fallback="JD" className="custom-class" />)
    expect(screen.getByText("JD").parentElement).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Avatar fallback="JD" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("handles empty fallback text", () => {
    render(<Avatar fallback="" />)
    expect(screen.getByText("")).toBeInTheDocument()
  })

  it("handles single word fallback text", () => {
    render(<Avatar fallback="John" />)
    expect(screen.getByText("J")).toBeInTheDocument()
  })

  it("handles multiple word fallback text", () => {
    render(<Avatar fallback="John Doe Smith" />)
    expect(screen.getByText("JS")).toBeInTheDocument()
  })

  it("uses fallback text as alt text when no alt is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" fallback="John Doe" />)
    expect(screen.getByRole("img")).toHaveAttribute("alt", "John Doe")
  })

  it("uses default alt text when no alt or fallback is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" />)
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Avatar")
  })
})
