import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Button } from "../button/button"
import { InfoIcon } from "lucide-react"

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="h-4 w-4" />
          <span className="sr-only">Information</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Additional information about this feature</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const WithForm: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <InfoIcon className="h-3 w-3" />
                <span className="sr-only">Username requirements</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Username must be between 3 and 20 characters</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <input
          id="username"
          type="text"
          className="w-full rounded-md border p-2"
          placeholder="Enter username"
        />
      </div>
    </div>
  )
}

export const WithInteractiveContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Interactive Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Tooltip Title</h4>
          <p className="text-sm text-gray-500">
            This tooltip contains interactive content and can be used to show additional information
            or actions.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Action</Button>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Delayed Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears after a 500ms delay</p>
      </TooltipContent>
    </Tooltip>
  )
}
