import { render, screen, fireEvent } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RadioGroupItem } from "@/components/atoms/radio-group"
import { FormRadioGroup } from "./radio-group"

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = z.object({
    preference: z.string().min(1, "Please select an option")
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      preference: ""
    }
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("FormRadioGroup", () => {
  it("renders with label", () => {
    render(
      <TestWrapper>
        <FormRadioGroup name="preference" label="Select your preference">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("Select your preference")).toBeInTheDocument()
  })

  it("renders with description", () => {
    render(
      <TestWrapper>
        <FormRadioGroup
          name="preference"
          label="Select your preference"
          description="Choose your preferred option"
        >
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("Choose your preferred option")).toBeInTheDocument()
  })

  it("renders with warning text", () => {
    render(
      <TestWrapper>
        <FormRadioGroup
          name="preference"
          label="Select your preference"
          warningText="Important notice"
        >
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("Important notice")).toBeInTheDocument()
  })

  it("shows required indicator when required", () => {
    render(
      <TestWrapper>
        <FormRadioGroup name="preference" label="Select your preference" required>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("disables radio group when disabled prop is true", () => {
    render(
      <TestWrapper>
        <FormRadioGroup name="preference" label="Select your preference" disabled>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeDisabled()
    })
  })

  it("handles radio selection", () => {
    render(
      <TestWrapper>
        <FormRadioGroup name="preference" label="Select your preference">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    const [option1] = screen.getAllByRole("radio")
    fireEvent.click(option1)
    expect(option1).toBeChecked()
  })

  it("shows validation error message", async () => {
    render(
      <TestWrapper>
        <FormRadioGroup name="preference" label="Select your preference" required>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    const [option1] = screen.getAllByRole("radio")
    fireEvent.focus(option1)
    fireEvent.blur(option1)
    expect(await screen.findByText("Please select an option")).toBeInTheDocument()
  })

  it("handles aria attributes", () => {
    render(
      <TestWrapper>
        <FormRadioGroup
          name="preference"
          label="Select your preference"
          aria-label="Custom Label"
          aria-describedby="custom-desc"
        >
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
        </FormRadioGroup>
      </TestWrapper>
    )
    const radioGroup = screen.getByRole("radiogroup")
    expect(radioGroup).toHaveAttribute("aria-label", "Custom Label")
    expect(radioGroup).toHaveAttribute("aria-describedby", "custom-desc")
  })
})
