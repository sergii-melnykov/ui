import { render, screen } from "@testing-library/react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

describe("Avatar", () => {
  it("renders avatar with image", () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test avatar" />
      </Avatar>
    )
    const image = screen.getByAltText("Test avatar")
    expect(image).toHaveAttribute("src", "/test.jpg")
  })

  it("renders avatar with fallback", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(
      <Avatar className="custom-class">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    const avatar = screen.getByText("JD").closest("span")
    expect(avatar).toHaveClass("custom-class")
  })
})
