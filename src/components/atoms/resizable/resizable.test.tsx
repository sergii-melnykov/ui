import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable"

describe("Resizable", () => {
  it("renders ResizablePanelGroup with children", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <div>Panel 1</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div>Panel 2</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )

    expect(screen.getByText("Panel 1")).toBeInTheDocument()
    expect(screen.getByText("Panel 2")).toBeInTheDocument()
  })

  it("renders ResizableHandle with handle when withHandle is true", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <div>Panel 1</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div>Panel 2</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )

    const handle = document.querySelector("[data-panel-resize-handle-id]")
    expect(handle).toBeInTheDocument()
  })
})
