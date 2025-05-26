import { render, screen, fireEvent } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RHFCheckbox } from "./rhf-checkbox"

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = z.object({
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions"
    })
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      terms: false
    }
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("RHFCheckbox", () => {
  it("renders with label", () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" />
      </TestWrapper>
    )
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument()
  })

  it("renders with description", () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" description="Please read the terms" />
      </TestWrapper>
    )
    expect(screen.getByText("Please read the terms")).toBeInTheDocument()
  })

  it("renders with warning text", () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" warningText="Important notice" />
      </TestWrapper>
    )
    expect(screen.getByText("Important notice")).toBeInTheDocument()
  })

  it("shows required indicator when required", () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" required />
      </TestWrapper>
    )
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("disables checkbox when disabled prop is true", () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" disabled />
      </TestWrapper>
    )
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("handles checkbox changes", () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" />
      </TestWrapper>
    )
    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it("shows validation error message", async () => {
    render(
      <TestWrapper>
        <RHFCheckbox name="terms" label="Accept terms" />
      </TestWrapper>
    )
    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)
    fireEvent.click(checkbox) // Uncheck to trigger validation
    expect(await screen.findByText("You must accept the terms and conditions")).toBeInTheDocument()
  })

  it("handles aria attributes", () => {
    render(
      <TestWrapper>
        <RHFCheckbox
          name="terms"
          label="Accept terms"
          aria-label="Custom Label"
          aria-describedby="custom-desc"
        />
      </TestWrapper>
    )
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("aria-label", "Custom Label")
    expect(checkbox).toHaveAttribute("aria-describedby", "custom-desc")
  })
})
