import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "."
import { Input } from "../input"

interface FormValues {
  username: string
}

describe("Form", () => {
  const TestForm = () => {
    const form = useForm<FormValues>({
      defaultValues: {
        username: ""
      }
    })

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }: { field: ControllerRenderProps<FormValues, "username"> }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }

  it("renders form components correctly", () => {
    render(<TestForm />)

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByText(/enter your username/i)).toBeInTheDocument()
  })

  it("handles form submission", async () => {
    const onSubmit = jest.fn()
    const TestFormWithSubmit = () => {
      const form = useForm<FormValues>({
        defaultValues: {
          username: ""
        }
      })

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: ControllerRenderProps<FormValues, "username"> }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </form>
        </Form>
      )
    }

    render(<TestFormWithSubmit />)

    await userEvent.type(screen.getByLabelText(/username/i), "testuser")
    await userEvent.click(screen.getByRole("button", { name: /submit/i }))

    expect(onSubmit).toHaveBeenCalledWith({ username: "testuser" }, expect.anything())
  })

  it("displays error message when validation fails", async () => {
    const TestFormWithValidation = () => {
      const form = useForm<FormValues>({
        defaultValues: {
          username: ""
        }
      })

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <FormField
              control={form.control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field }: { field: ControllerRenderProps<FormValues, "username"> }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit">Submit</button>
          </form>
        </Form>
      )
    }

    render(<TestFormWithValidation />)

    await userEvent.click(screen.getByRole("button", { name: /submit/i }))

    expect(screen.getByText(/username is required/i)).toBeInTheDocument()
  })

  it("handles form field context correctly", () => {
    const TestFormWithContext = () => {
      const form = useForm<FormValues>({
        defaultValues: {
          username: ""
        }
      })

      return (
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: ControllerRenderProps<FormValues, "username"> }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )
    }

    render(<TestFormWithContext />)

    const input = screen.getByLabelText(/username/i)
    expect(input).toHaveAttribute("id")
    expect(input).toHaveAttribute("aria-describedby")
  })
})
