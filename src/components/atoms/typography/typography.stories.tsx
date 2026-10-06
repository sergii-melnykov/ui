import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Typography,
  TypographyTable,
  TypographyTableCell,
  TypographyTableHead,
  TypographyTableRow
} from "./index"

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "blockquote",
        "list",
        "lead",
        "large",
        "small",
        "muted",
        "inline-code"
      ]
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"]
    }
  }
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "p"
  }
}

export const Heading1: Story = {
  args: {
    children: "Heading 1",
    variant: "h1"
  }
}

export const Heading2: Story = {
  args: {
    children: "Heading 2",
    variant: "h2"
  }
}

export const Heading3: Story = {
  args: {
    children: "Heading 3",
    variant: "h3"
  }
}

export const Heading4: Story = {
  args: {
    children: "Heading 4",
    variant: "h4"
  }
}

export const Heading5: Story = {
  args: {
    children: "Heading 5",
    variant: "h5"
  }
}

export const Heading6: Story = {
  args: {
    children: "Heading 6",
    variant: "h6"
  }
}

export const Blockquote: Story = {
  args: {
    children: "This is a blockquote",
    variant: "blockquote"
  }
}

export const Lead: Story = {
  args: {
    children: "This is a lead paragraph",
    variant: "lead"
  }
}

export const Large: Story = {
  args: {
    children: "This is large text",
    variant: "large"
  }
}

export const Small: Story = {
  args: {
    children: "This is small text",
    variant: "small"
  }
}

export const Muted: Story = {
  args: {
    children: "This is muted text",
    variant: "muted"
  }
}

export const InlineCode: Story = {
  args: {
    children: "@radix-ui/react-alert-dialog",
    variant: "inline-code"
  }
}

export const UnorderedList: Story = {
  render: () => (
    <Typography variant="list">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </Typography>
  )
}

export const Table: Story = {
  render: () => (
    <TypographyTable>
      <thead>
        <TypographyTableRow>
          <TypographyTableHead>King&apos;s Treasury</TypographyTableHead>
          <TypographyTableHead>People&apos;s happiness</TypographyTableHead>
        </TypographyTableRow>
      </thead>
      <tbody>
        <TypographyTableRow>
          <TypographyTableCell>Empty</TypographyTableCell>
          <TypographyTableCell>Overflowing</TypographyTableCell>
        </TypographyTableRow>
        <TypographyTableRow>
          <TypographyTableCell>Modest</TypographyTableCell>
          <TypographyTableCell>Satisfied</TypographyTableCell>
        </TypographyTableRow>
      </tbody>
    </TypographyTable>
  )
}

export const Demo: Story = {
  render: () => (
    <div>
      <Typography variant="h1">Taxing Laughter: The Joke Tax Chronicles</Typography>
      <Typography variant="lead">
        Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
        on his throne. One day, his advisors came to him with a problem: the kingdom was running
        out of money.
      </Typography>
      <Typography variant="h2">The King&apos;s Plan</Typography>
      <Typography variant="p">
        The king thought long and hard, and finally came up with{" "}
        <a href="#" className="font-medium text-primary underline underline-offset-4">
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </Typography>
      <Typography variant="blockquote">
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so it&apos;s only fair
        that they should pay for the privilege.&quot;
      </Typography>
      <Typography variant="h3">The Joke Tax</Typography>
      <Typography variant="p">
        The king&apos;s subjects were not amused. They grumbled and complained, but the king was
        firm:
      </Typography>
      <Typography variant="list">
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners: 20 gold coins</li>
      </Typography>
      <TypographyTable>
        <thead>
          <TypographyTableRow>
            <TypographyTableHead>King&apos;s Treasury</TypographyTableHead>
            <TypographyTableHead>People&apos;s happiness</TypographyTableHead>
          </TypographyTableRow>
        </thead>
        <tbody>
          <TypographyTableRow>
            <TypographyTableCell>Empty</TypographyTableCell>
            <TypographyTableCell>Overflowing</TypographyTableCell>
          </TypographyTableRow>
          <TypographyTableRow>
            <TypographyTableCell>Full</TypographyTableCell>
            <TypographyTableCell>Ecstatic</TypographyTableCell>
          </TypographyTableRow>
        </tbody>
      </TypographyTable>
      <Typography variant="p">
        The moral of the story is: never underestimate the power of a good laugh and always be
        careful of bad ideas.
      </Typography>
    </div>
  )
}

export const Centered: Story = {
  args: {
    children: "This text is centered",
    variant: "p",
    align: "center"
  }
}

export const RightAligned: Story = {
  args: {
    children: "This text is right-aligned",
    variant: "p",
    align: "right"
  }
}

export const Justified: Story = {
  args: {
    children:
      "This text is justified. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    variant: "p",
    align: "justify"
  }
}
