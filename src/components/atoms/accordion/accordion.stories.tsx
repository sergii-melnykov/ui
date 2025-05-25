import type { Meta, StoryObj } from "@storybook/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

/**
 * A collapsible content component that displays a list of expandable/collapsible sections.
 * Built on top of Radix UI's Accordion primitive.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-accordion--docs
 */
const meta = {
  title: "Atoms/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
An accordion component that displays a list of expandable/collapsible sections.
Built on top of Radix UI's Accordion primitive.

## Features
- Single or multiple sections open at once
- Collapsible sections
- Keyboard navigation
- Accessible by default
- Customizable styling
- Animated transitions
        `
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "The type of accordion to render",
      defaultValue: "single"
    },
    collapsible: {
      control: "boolean",
      description: "Whether to allow multiple items to be open at once",
      defaultValue: false
    }
  }
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes. You can open multiple items at once by setting the type prop to &quot;multiple&quot;.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it customizable?</AccordionTrigger>
        <AccordionContent>
          Yes. You can customize the styling using Tailwind CSS classes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it responsive?</AccordionTrigger>
        <AccordionContent>Yes. It works well on all screen sizes.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const CustomStyling: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="bg-primary/10 hover:bg-primary/20 rounded-lg px-4">
          Custom Styled Trigger
        </AccordionTrigger>
        <AccordionContent className="bg-primary/5 rounded-lg mt-2 px-4">
          This accordion has custom styling applied to both the trigger and content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-none mt-2">
        <AccordionTrigger className="bg-primary/10 hover:bg-primary/20 rounded-lg px-4">
          Another Custom Trigger
        </AccordionTrigger>
        <AccordionContent className="bg-primary/5 rounded-lg mt-2 px-4">
          You can customize the appearance using Tailwind CSS classes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
