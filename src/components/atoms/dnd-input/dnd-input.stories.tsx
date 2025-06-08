import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DndInput } from "./dnd-input"
import { UploadIcon } from "lucide-react"

const meta: Meta<typeof DndInput> = {
  title: "Atoms/DndInput",
  component: DndInput,
  parameters: {
    docs: {
      description: {
        component: `
**DndInput** is a flexible and accessible drag-and-drop file input component built on top of react-dropzone.\n
- Fully keyboard and screen reader accessible\n- Customizable through props and children\n- Visual feedback for drag and focus states\n- Built-in default UI with option for custom content\n
[Component Docs](https://sergii-melnykov.github.io/ui/?path=/docs/atoms-dnd-input--docs)
        `
      }
    },
    a11y: { disable: false }
  },
  tags: ["autodocs"],
  argTypes: {
    onDrop: {
      action: "onDrop",
      description:
        "Callback when files are dropped or selected. Receives accepted files and file rejections."
    },
    accept: {
      control: "object",
      description: "Object specifying accepted file types. Example: { 'image/*': ['.png', '.jpg'] }"
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple files to be uploaded at once."
    },
    disabled: {
      control: "boolean",
      description: "Disable the input and prevent file selection."
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes."
    },
    minSize: {
      control: "number",
      description: "Minimum file size in bytes."
    },
    className: {
      control: "text",
      description: "Additional CSS class name for styling the dropzone container."
    },
    children: {
      control: "text",
      description:
        "Custom content to render inside the dropzone. If not provided, a default upload UI will be shown."
    }
  }
}
export default meta

type Story = StoryObj<typeof DndInput>

export const Default: Story = {
  args: {
    onDrop: (files: File[]) => alert(`Dropped: ${files.map((f) => f.name).join(", ")}`),
    multiple: false
  },
  render: (args) => <DndInput {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Basic usage with default UI. Accepts any file type."
      }
    }
  }
}

export const WithFileTypeRestriction: Story = {
  args: {
    onDrop: (files: File[]) => alert(`Accepted: ${files.map((f) => f.name).join(", ")}`),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"]
    },
    multiple: true
  },
  render: (args) => <DndInput {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Only accepts image files (PNG, JPG, JPEG, GIF) and PDF files. Allows multiple file selection."
      }
    }
  }
}

export const WithCustomContent: Story = {
  args: {
    onDrop: (files: File[]) => alert(`Dropped: ${files.map((f) => f.name).join(", ")}`),
    className: "bg-gray-50 hover:bg-gray-100"
  },
  render: (args) => (
    <DndInput {...args}>
      <div className="flex flex-col items-center gap-2 p-4">
        <UploadIcon className="h-8 w-8 text-blue-600" />
        <div className="text-center">
          <p className="font-medium">Drop your files here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>
      </div>
    </DndInput>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom content with a centered layout and hover effect."
      }
    }
  }
}

export const WithErrorHandling: Story = {
  args: {
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: {
      "application/pdf": [".pdf"]
    }
  },
  render: (args) => {
    const [error, setError] = useState<string | null>(null)
    return (
      <div>
        <DndInput
          {...args}
          onDrop={(files, fileRejections) => {
            if (fileRejections && fileRejections.length > 0) {
              const errors = fileRejections.map((rejection) => {
                if (rejection.errors[0].code === "file-too-large") {
                  return "File is too large (max 5MB)"
                }
                return "Invalid file type (PDF only)"
              })
              setError(errors.join(", "))
            } else {
              setError(null)
              alert(`Dropped: ${files.map((f) => f.name).join(", ")}`)
            }
          }}
        />
        {error && (
          <div className="text-red-600 mt-2" role="alert">
            {error}
          </div>
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows error messages for invalid file types and size limits. Only accepts PDF files up to 5MB."
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    onDrop: (files: File[]) => alert(`Dropped: ${files.map((f) => f.name).join(", ")}`)
  },
  render: (args) => <DndInput {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Disabled state prevents file selection and shows visual feedback."
      }
    }
  }
}
