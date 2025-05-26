import { render, screen, fireEvent } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RHFRadioGroup } from "./rhf-radio-group"
import { RadioGroupItem } from "@/components/atoms/radio-group"

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = z.object({
    preference: z.string().min(1, "Please select an option")
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      preference: ""
    }
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("RHFRadioGroup", () => {
  it("renders with label", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup name="preference" label="Select your preference">
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("Select your preference")).toBeInTheDocument()
  })

  it("renders with description", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup
          name="preference"
          label="Select your preference"
          description="Choose your preferred option"
        >
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("Choose your preferred option")).toBeInTheDocument()
  })

  it("renders with warning text", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup
          name="preference"
          label="Select your preference"
          warningText="Important notice"
        >
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("Important notice")).toBeInTheDocument()
  })

  it("shows required indicator when required", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup name="preference" label="Select your preference" required>
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("disables radio group when disabled prop is true", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup name="preference" label="Select your preference" disabled>
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    const radioGroup = screen.getByRole("radiogroup")
    expect(radioGroup).toBeDisabled()
  })

  it("handles radio selection", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup name="preference" label="Select your preference">
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    const option1 = screen.getByLabelText("Option 1")
    fireEvent.click(option1)
    expect(option1).toBeChecked()
  })

  it("shows validation error message", async () => {
    render(
      <TestWrapper>
        <RHFRadioGroup name="preference" label="Select your preference" required>
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    const submitButton = screen.getByRole("button", { name: /submit/i })
    fireEvent.click(submitButton)
    expect(await screen.findByText("Please select an option")).toBeInTheDocument()
  })

  it("handles aria attributes", () => {
    render(
      <TestWrapper>
        <RHFRadioGroup
          name="preference"
          label="Select your preference"
          aria-label="Custom Label"
          aria-describedby="custom-desc"
        >
          <RadioGroupItem value="option1" label="Option 1" />
          <RadioGroupItem value="option2" label="Option 2" />
        </RHFRadioGroup>
      </TestWrapper>
    )
    const radioGroup = screen.getByRole("radiogroup")
    expect(radioGroup).toHaveAttribute("aria-label", "Custom Label")
    expect(radioGroup).toHaveAttribute("aria-describedby", "custom-desc")
  })
})
