import type { Meta, StoryObj } from "@storybook/react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/atoms/collapsible"

const meta: Meta<typeof Collapsible> = {
  title: "Atoms/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the collapsible is open by default"
    }
  }
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium">Collapsible Content</h4>
          <p className="text-sm text-muted-foreground">
            This is the content that can be toggled by clicking the trigger button above.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const WithCustomStyling: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
        Custom Trigger
      </CollapsibleTrigger>
      <CollapsibleContent className="border rounded-md mt-2">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium">Custom Styled Content</h4>
          <p className="text-sm text-muted-foreground">
            This content has custom styling applied to both the trigger and content areas.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium">Default Open Content</h4>
          <p className="text-sm text-muted-foreground">
            This content is visible by default when the component mounts.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
