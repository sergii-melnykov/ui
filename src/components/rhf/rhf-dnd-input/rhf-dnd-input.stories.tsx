import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { RhfDndInput } from "./rhf-dnd-input"
import { Form } from "../form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const meta: Meta<typeof RhfDndInput> = {
  title: "RHF/RhfDndInput",
  component: RhfDndInput,
  parameters: {
    docs: {
      description: {
        component: `
**RhfDndInput** is a React Hook Form wrapper around the DndInput component.\n
- Integrates with React Hook Form for form handling and validation\n- Supports file type restrictions and size limits\n- Provides error handling and accessibility features\n- Customizable through props and children\n
[Component Docs](https://sergii-melnykov.github.io/ui/?path=/docs/atoms-dnd-input--docs)
        `
      }
    },
    a11y: { disable: false }
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-4">
        <Story />
      </div>
    )
  ]
}

export default meta

type Story = StoryObj<typeof RhfDndInput>

// Form wrapper component for stories
const FormWrapper = ({ children, onSubmit = console.log }) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        files: z.array(z.instanceof(File)).min(1, "Please upload at least one file")
      })
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Form>
  )
}

export const Default: Story = {
  render: (args) => (
    <FormWrapper>
      <RhfDndInput
        {...args}
        name="files"
        label="Upload Files"
        description="Drag and drop files here or click to browse"
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic usage with form validation. Requires at least one file to be uploaded."
      }
    }
  }
}

export const WithFileTypeRestriction: Story = {
  render: (args) => (
    <FormWrapper>
      <RhfDndInput
        {...args}
        name="files"
        label="Upload Images"
        description="Only PNG and JPG files are allowed"
        accept={{
          "image/*": [".png", ".jpg", ".jpeg"]
        }}
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Restricts file uploads to image files (PNG, JPG, JPEG)."
      }
    }
  }
}

export const WithSizeLimit: Story = {
  render: (args) => (
    <FormWrapper>
      <RhfDndInput
        {...args}
        name="files"
        label="Upload Documents"
        description="Maximum file size: 5MB"
        maxSize={5 * 1024 * 1024} // 5MB
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Limits file size to 5MB. Files larger than this will be rejected."
      }
    }
  }
}

export const MultipleFiles: Story = {
  render: (args) => (
    <FormWrapper>
      <RhfDndInput
        {...args}
        name="files"
        label="Upload Multiple Files"
        description="You can upload multiple files at once"
        multiple
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Allows multiple files to be uploaded at once."
      }
    }
  }
}

export const Disabled: Story = {
  render: (args) => (
    <FormWrapper>
      <RhfDndInput
        {...args}
        name="files"
        label="Upload Files"
        description="This field is disabled"
        disabled
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled state prevents file selection and shows visual feedback."
      }
    }
  }
}

export const WithCustomValidation: Story = {
  render: (args) => (
    <FormWrapper>
      <RhfDndInput
        {...args}
        name="files"
        label="Upload Files"
        description="Files must be less than 2MB and be either PDF or DOC"
        accept={{
          "application/pdf": [".pdf"],
          "application/msword": [".doc"]
        }}
        maxSize={2 * 1024 * 1024} // 2MB
        rules={{
          validate: (files) => {
            if (!files || files.length === 0) return "Please upload at least one file"
            if (files.some((file) => file.size > 2 * 1024 * 1024)) {
              return "All files must be less than 2MB"
            }
            return true
          }
        }}
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combines multiple validation rules: file type restrictions, size limits, and custom validation."
      }
    }
  }
}
