import type { Meta, StoryObj } from "@storybook/react"
import { Banana, Apple, Check } from "lucide-react"
import SearchableSelect from "./select"

const meta: Meta<typeof SearchableSelect> = {
  title: "Atoms/Select",
  component: SearchableSelect,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof SearchableSelect>

export const Default: Story = {
  render: () => (
    <div className="w-[200px]">
      <SearchableSelect
        fullWidth
        options={[
          { id: "1", label: "Apple", startIcon: <Apple />, endIcon: <Check /> },
          { id: "2", label: "Banana", startIcon: <Banana />, endIcon: <Check /> },
          { id: "3", label: "Orange", startIcon: <Banana />, endIcon: <Check /> },
          { id: "4", label: "Pear", startIcon: <Apple />, endIcon: <Check /> },
          { id: "5", label: "Pineapple", startIcon: <Banana /> },
          { id: "6", label: "Strawberry", startIcon: <Apple />, endIcon: <Check /> },
          { id: "7", label: "Watermelon", startIcon: <Banana />, endIcon: <Check /> }
        ]}
        value="3"
        onChange={() => {}}
      />
    </div>
  )
}
