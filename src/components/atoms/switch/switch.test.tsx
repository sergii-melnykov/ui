import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Switch } from "./switch"

describe("Switch", () => {
  it("renders correctly", () => {
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("can be toggled", async () => {
    render(<Switch />)
    const switchElement = screen.getByRole("switch")
    expect(switchElement).not.toBeChecked()
    await userEvent.click(switchElement)
    expect(switchElement).toBeChecked()
  })

  it("can be disabled", () => {
    render(<Switch disabled />)
    const switchElement = screen.getByRole("switch")
    expect(switchElement).toBeDisabled()
  })

  it("can be checked by default", () => {
    render(<Switch defaultChecked />)
    const switchElement = screen.getByRole("switch")
    expect(switchElement).toBeChecked()
  })
})
