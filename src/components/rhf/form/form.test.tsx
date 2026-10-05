import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { Input } from "@/components/atoms"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "."

interface FormValues {
  username: string
}

describe("Form", () => {
  const TestForm = () => {
    const methods = useForm<FormValues>({
      defaultValues: {
        username: ""
      }
    })

    return (
      <Form {...methods}>
        <form
          onSubmit={(event) => {
            void methods.handleSubmit(() => {})(event)
          }}
        >
          <FormField
            control={methods.control}
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
    const onSubmit = vi.fn()
    const TestFormWithSubmit = () => {
      const methods = useForm<FormValues>({
        defaultValues: {
          username: ""
        }
      })

      return (
        <Form {...methods}>
          <form
            onSubmit={(event) => {
              void methods.handleSubmit(onSubmit)(event)
            }}
          >
            <FormField
              control={methods.control}
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
      const methods = useForm<FormValues>({
        defaultValues: {
          username: ""
        }
      })

      return (
        <Form {...methods}>
          <form
            onSubmit={(event) => {
              void methods.handleSubmit(() => {})(event)
            }}
          >
            <FormField
              control={methods.control}
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
      const methods = useForm<FormValues>({
        defaultValues: {
          username: ""
        }
      })

      return (
        <Form {...methods}>
          <FormField
            control={methods.control}
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
        </Form>
      )
    }

    render(<TestFormWithContext />)

    const input = screen.getByLabelText(/username/i)
    expect(input).toHaveAttribute("id")
    expect(input).toHaveAttribute("aria-describedby")
  })
})
