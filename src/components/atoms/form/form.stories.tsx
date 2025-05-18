import type { Meta, StoryObj } from "@storybook/react"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "."
import { Input } from "../input"
import { Button } from "../button"

const meta: Meta<typeof Form> = {
  title: "Atoms/Form",
  component: Form,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof Form>

interface FormValues {
  username: string
  email: string
  password: string
}

const FormExample = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-6">
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
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          render={({ field }: { field: ControllerRenderProps<FormValues, "email"> }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormDescription>We'll never share your email with anyone else.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          }}
          render={({ field }: { field: ControllerRenderProps<FormValues, "password"> }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription>Must be at least 8 characters long.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  )
}

export const Default: Story = {
  render: () => <FormExample />
}

export const WithValidation: Story = {
  render: () => <FormExample />,
  parameters: {
    docs: {
      description: {
        story: "Form with validation rules for each field."
      }
    }
  }
}

export const WithCustomStyling: Story = {
  render: () => <FormExample />,
  parameters: {
    docs: {
      description: {
        story: "Form with custom styling using Tailwind CSS classes."
      }
    }
  }
}
