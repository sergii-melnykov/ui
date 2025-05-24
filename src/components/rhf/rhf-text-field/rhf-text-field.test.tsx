import { render, screen, fireEvent } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { RHFTextField } from "./rhf-text-field"

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = z.object({
    text: z.string().min(1, "Text is required"),
    email: z.string().email("Invalid email address"),
    number: z.number().min(1, "Number must be greater than 0")
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
      email: "",
      number: 0
    }
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("RHFTextField", () => {
  it("renders with label", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" />
      </TestWrapper>
    )
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument()
  })

  it("renders with description", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" description="Test Description" />
      </TestWrapper>
    )
    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })

  it("renders with warning text", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" warningText="Test Warning" />
      </TestWrapper>
    )
    expect(screen.getByText("Test Warning")).toBeInTheDocument()
  })

  it("shows required indicator when required", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" required />
      </TestWrapper>
    )
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("disables input when disabled prop is true", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" disabled />
      </TestWrapper>
    )
    expect(screen.getByLabelText("Test Label")).toBeDisabled()
  })

  it("sets input as readOnly when readOnly prop is true", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" readOnly />
      </TestWrapper>
    )
    expect(screen.getByLabelText("Test Label")).toHaveAttribute("readonly")
  })

  it("handles text input changes", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" />
      </TestWrapper>
    )
    const input = screen.getByLabelText("Test Label")
    fireEvent.change(input, { target: { value: "test value" } })
    expect(input).toHaveValue("test value")
  })

  it("handles number input changes", () => {
    render(
      <TestWrapper>
        <RHFTextField name="number" label="Number Label" type="number" />
      </TestWrapper>
    )
    const input = screen.getByLabelText("Number Label")
    fireEvent.change(input, { target: { value: "42" } })
    expect(input).toHaveValue(42)
  })

  it("shows validation error message", async () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" />
      </TestWrapper>
    )
    const input = screen.getByLabelText("Test Label")
    fireEvent.blur(input)
    expect(await screen.findByText("Text is required")).toBeInTheDocument()
  })

  it("shows email validation error message", async () => {
    render(
      <TestWrapper>
        <RHFTextField name="email" label="Email Label" type="email" />
      </TestWrapper>
    )
    const input = screen.getByLabelText("Email Label")
    fireEvent.change(input, { target: { value: "invalid-email" } })
    fireEvent.blur(input)
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument()
  })

  it("trims string values on blur", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" />
      </TestWrapper>
    )
    const input = screen.getByLabelText("Test Label")
    fireEvent.change(input, { target: { value: "  test value  " } })
    fireEvent.blur(input)
    expect(input).toHaveValue("test value")
  })

  it("applies custom className", () => {
    render(
      <TestWrapper>
        <RHFTextField name="text" label="Test Label" className="custom-class" />
      </TestWrapper>
    )
    expect(screen.getByLabelText("Test Label")).toHaveClass("custom-class")
  })
})
