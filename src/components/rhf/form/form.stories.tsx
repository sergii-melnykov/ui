import type { Meta, StoryObj } from "@storybook/react-vite"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { Button, Input } from "@/components/atoms"
import { FormCheckbox } from "@/components/rhf/checkbox"
import { FormCombobox } from "@/components/rhf/combobox"
import { FormDatePicker } from "@/components/rhf/date-picker"
import { FormInput } from "@/components/rhf/input"
import { FormSelect } from "@/components/rhf/select"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormRootError
} from "."

const meta: Meta<typeof Form> = {
  title: "Form/Form",
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
    <Form {...methods}>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          void methods.handleSubmit(onSubmit)(event)
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
              <FormDescription>We&apos;ll never share your email with anyone else.</FormDescription>
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
      </form>
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

export const WithRootServerError: Story = {
  render: function WithRootServerErrorStory() {
    const methods = useForm<{ email: string }>({
      defaultValues: { email: "" },
      mode: "onSubmit"
    })

    const onSubmit = () => {
      methods.setError("root.serverError", {
        type: "server",
        message: "Something went wrong. Please try again."
      })
    }

    return (
      <Form {...methods}>
        <form
          className="w-[320px] space-y-4"
          onSubmit={(event) => {
            void methods.handleSubmit(onSubmit)(event)
          }}
        >
          <FormRootError />
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }
}

export const CompositeFieldWrappers: Story = {
  render: function CompositeFieldWrappersStory() {
    const methods = useForm({
      defaultValues: {
        name: "",
        role: "",
        team: "",
        startDate: undefined as Date | undefined,
        terms: false
      },
      mode: "onSubmit"
    })

    return (
      <Form {...methods}>
        <form
          className="flex w-[360px] flex-col gap-5"
          onSubmit={(event) => {
            void methods.handleSubmit((data) => {
              console.log(data)
            })(event)
          }}
        >
          <FormInput name="name" label="Name" placeholder="Your name" required />
          <FormSelect
            name="role"
            label="Role"
            placeholder="Select role"
            options={[
              { id: "eng", label: "Engineering" },
              { id: "design", label: "Design" }
            ]}
          />
          <FormCombobox
            name="team"
            label="Team"
            placeholder="Search teams…"
            fullWidth
            options={[
              { id: "alpha", label: "Team Alpha" },
              { id: "beta", label: "Team Beta" }
            ]}
          />
          <FormDatePicker name="startDate" label="Start date" />
          <FormCheckbox name="terms" label="Accept terms" />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Copy-paste template combining common Form* field wrappers."
      }
    }
  }
}
