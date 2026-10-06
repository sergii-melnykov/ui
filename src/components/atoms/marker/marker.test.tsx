import { render, screen } from "@testing-library/react"
import { GitBranch } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "./marker"

describe("Marker", () => {
  it("renders marker content", () => {
    render(
      <Marker>
        <MarkerContent>A default marker for inline notes.</MarkerContent>
      </Marker>
    )
    expect(screen.getByText("A default marker for inline notes.")).toBeInTheDocument()
  })

  it("applies separator variant on the root", () => {
    render(
      <Marker variant="separator" data-testid="marker">
        <MarkerContent>A separator marker</MarkerContent>
      </Marker>
    )
    expect(screen.getByTestId("marker")).toHaveAttribute("data-variant", "separator")
  })

  it("renders decorative icon hidden from assistive tech", () => {
    render(
      <Marker>
        <MarkerIcon data-testid="marker-icon">
          <GitBranch />
        </MarkerIcon>
        <MarkerContent>With icon</MarkerContent>
      </Marker>
    )
    expect(screen.getByTestId("marker-icon")).toHaveAttribute("aria-hidden", "true")
  })

  it("renders as child button", () => {
    render(
      <Marker asChild>
        <button type="button">Revert this change</button>
      </Marker>
    )
    expect(screen.getByRole("button", { name: "Revert this change" })).toBeInTheDocument()
  })
})
