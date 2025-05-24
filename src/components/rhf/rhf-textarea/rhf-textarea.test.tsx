import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { FormProvider, useForm, type FieldValues } from "react-hook-form"
import { RHFTextarea } from "./rhf-textarea"

// Wrapper component to provide form context
const FormWrapper = ({
  children,
  defaultValues = {}
}: {
  children: React.ReactNode
  defaultValues?: FieldValues
}) => {
  const methods = useForm({ defaultValues })
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("RHFTextarea", () => {
  it("renders with label and required indicator", () => {
    render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" required />
      </FormWrapper>
    )

    expect(screen.getByText("Test Label")).toBeInTheDocument()
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("renders with description", () => {
    render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" description="Test Description" />
      </FormWrapper>
    )

    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })

  it("shows warning text when provided and no error", () => {
    render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" warningText="This is a warning" />
      </FormWrapper>
    )

    expect(screen.getByText("This is a warning")).toBeInTheDocument()
  })

  it("trims value on blur", () => {
    const { container } = render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" />
      </FormWrapper>
    )

    const textarea = screen.getByRole("textbox")
    fireEvent.change(textarea, { target: { value: "  test value  " } })
    fireEvent.blur(textarea)

    expect(textarea).toHaveValue("test value")
  })

  it("handles disabled state", () => {
    render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" disabled />
      </FormWrapper>
    )

    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeDisabled()
  })

  it("handles readOnly state", () => {
    render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" readOnly />
      </FormWrapper>
    )

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveAttribute("readonly")
  })

  it("applies custom className", () => {
    render(
      <FormWrapper>
        <RHFTextarea name="test" label="Test Label" className="custom-class" />
      </FormWrapper>
    )

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("custom-class")
  })

  it("handles aria attributes", () => {
    render(
      <FormWrapper>
        <RHFTextarea
          name="test"
          label="Test Label"
          aria-label="Custom Label"
          aria-describedby="custom-desc"
        />
      </FormWrapper>
    )

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveAttribute("aria-label", "Custom Label")
    expect(textarea).toHaveAttribute("aria-describedby", "custom-desc")
  })
})
