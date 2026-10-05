import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"

describe("Avatar", () => {
  it("renders avatar with image", async () => {
    render(
      <Avatar>
        <AvatarImage
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="Test avatar"
        />
      </Avatar>
    )
    const image = await waitFor(() => {
      const img = document.querySelector("img")
      if (!img) throw new Error("image not mounted")
      fireEvent.load(img)
      return screen.getByAltText("Test avatar")
    })
    expect(image).toHaveAttribute("src")
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
    expect(screen.getByText("JD").closest(".custom-class")).toBeInTheDocument()
  })
})
