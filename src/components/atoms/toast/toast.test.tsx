import type { ReactElement } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CircleCheck } from "lucide-react"
import { vi } from "vitest"

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "./toast"

function renderToast(ui: ReactElement) {
  return render(
    <ToastProvider duration={Number.POSITIVE_INFINITY}>
      {ui}
      <ToastViewport />
    </ToastProvider>
  )
}

describe("Toast", () => {
  it("renders title and description", () => {
    renderToast(
      <Toast open onOpenChange={() => {}}>
        <ToastTitle>Toast title</ToastTitle>
        <ToastDescription>Toast description</ToastDescription>
        <ToastClose />
      </Toast>
    )

    expect(screen.getByText("Toast title")).toBeInTheDocument()
    expect(screen.getByText("Toast description")).toBeInTheDocument()
  })

  it("renders with a leading icon", () => {
    renderToast(
      <Toast open onOpenChange={() => {}}>
        <CircleCheck data-testid="toast-icon" />
        <ToastDescription>Event has been created</ToastDescription>
        <ToastClose />
      </Toast>
    )

    expect(screen.getByTestId("toast-icon")).toBeInTheDocument()
    expect(screen.getByText("Event has been created")).toBeInTheDocument()
  })

  it("applies destructive variant classes", () => {
    renderToast(
      <Toast variant="destructive" open onOpenChange={() => {}}>
        <ToastTitle>Error</ToastTitle>
        <ToastClose />
      </Toast>
    )

    expect(screen.getByText("Error").closest("[data-state]")).toHaveClass("destructive")
  })

  it("renders action and close controls", () => {
    renderToast(
      <Toast open onOpenChange={() => {}}>
        <ToastDescription>Toast description</ToastDescription>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </Toast>
    )

    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Close toast" })).toBeInTheDocument()
  })

  it("calls onOpenChange when close is activated", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    renderToast(
      <Toast open onOpenChange={onOpenChange}>
        <ToastDescription>Dismiss me</ToastDescription>
        <ToastClose />
      </Toast>
    )

    await user.click(screen.getByRole("button", { name: "Close toast" }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
