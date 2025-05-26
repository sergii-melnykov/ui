import { render, screen, fireEvent } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RHFSwitch } from "./rhf-switch"

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = z.object({
    notifications: z.boolean().refine((val) => val === true, {
      message: "You must enable notifications"
    })
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      notifications: false
    }
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("RHFSwitch", () => {
  it("renders with label", () => {
    render(
      <TestWrapper>
        <RHFSwitch name="notifications" label="Enable notifications" />
      </TestWrapper>
    )
    expect(screen.getByLabelText("Enable notifications")).toBeInTheDocument()
  })

  it("renders with description", () => {
    render(
      <TestWrapper>
        <RHFSwitch
          name="notifications"
          label="Enable notifications"
          description="Receive updates about your account"
        />
      </TestWrapper>
    )
    expect(screen.getByText("Receive updates about your account")).toBeInTheDocument()
  })

  it("renders with warning text", () => {
    render(
      <TestWrapper>
        <RHFSwitch
          name="notifications"
          label="Enable notifications"
          warningText="Important notice"
        />
      </TestWrapper>
    )
    expect(screen.getByText("Important notice")).toBeInTheDocument()
  })

  it("shows required indicator when required", () => {
    render(
      <TestWrapper>
        <RHFSwitch name="notifications" label="Enable notifications" required />
      </TestWrapper>
    )
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("disables switch when disabled prop is true", () => {
    render(
      <TestWrapper>
        <RHFSwitch name="notifications" label="Enable notifications" disabled />
      </TestWrapper>
    )
    expect(screen.getByRole("switch")).toBeDisabled()
  })

  it("handles switch changes", () => {
    render(
      <TestWrapper>
        <RHFSwitch name="notifications" label="Enable notifications" />
      </TestWrapper>
    )
    const switchElement = screen.getByRole("switch")
    fireEvent.click(switchElement)
    expect(switchElement).toBeChecked()
  })

  it("shows validation error message", async () => {
    render(
      <TestWrapper>
        <RHFSwitch name="notifications" label="Enable notifications" />
      </TestWrapper>
    )
    const switchElement = screen.getByRole("switch")
    fireEvent.click(switchElement)
    fireEvent.click(switchElement) // Toggle off to trigger validation
    expect(await screen.findByText("You must enable notifications")).toBeInTheDocument()
  })

  it("handles aria attributes", () => {
    render(
      <TestWrapper>
        <RHFSwitch
          name="notifications"
          label="Enable notifications"
          aria-label="Custom Label"
          aria-describedby="custom-desc"
        />
      </TestWrapper>
    )
    const switchElement = screen.getByRole("switch")
    expect(switchElement).toHaveAttribute("aria-label", "Custom Label")
    expect(switchElement).toHaveAttribute("aria-describedby", "custom-desc")
  })
})
