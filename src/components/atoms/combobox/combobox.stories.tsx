import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Globe } from "lucide-react"

import { InputGroupAddon, InputGroupText } from "@/components/atoms/input-group/input-group"
import { Label } from "@/components/atoms/label/label"

import { ComboboxDesignSpec } from "./combobox-design-spec"
import { FRAMEWORKS, FRAMEWORK_GROUPS } from "./combobox-shared"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue
} from "./combobox"

const meta: Meta<typeof Combobox> = {
  title: "Atoms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Combobox>

export const DesignSpec: Story = {
  render: () => <ComboboxDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <div className="w-[215px]">
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export const Multiple: Story = {
  render: function Render() {
    const [value, setValue] = React.useState<string[]>(["Next.js"])

    return (
      <div className="w-[320px]">
        <Combobox items={FRAMEWORKS} multiple value={value} onValueChange={setValue}>
        <ComboboxChips>
          <ComboboxValue>
            {value.map((item) => (
              <ComboboxChip key={item}>{item}</ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Add framework" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
        </Combobox>
      </div>
    )
  }
}

export const WithClear: Story = {
  name: "With clear",
  render: () => (
    <div className="w-[215px]">
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput placeholder="Select a framework" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export const WithGroups: Story = {
  name: "With groups",
  render: () => (
    <div className="w-[215px]">
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput placeholder="Select a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {FRAMEWORK_GROUPS.map((group, index) => (
              <React.Fragment key={group.label}>
                {index > 0 ? <ComboboxSeparator /> : null}
                <ComboboxGroup items={group.items}>
                  <ComboboxLabel>{group.label}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              </React.Fragment>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export const WithInputGroupAddon: Story = {
  name: "With input group addon",
  render: () => (
    <div className="w-[240px]">
      <Combobox items={FRAMEWORKS}>
        <ComboboxInput placeholder="Select a framework">
          <InputGroupAddon align="inline-start">
            <InputGroupText>
              <Globe className="size-4" />
            </InputGroupText>
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export const WithFieldLabel: Story = {
  name: "With field label",
  render: function Render() {
    const [value, setValue] = React.useState<string[]>([])

    return (
      <div className="flex w-[320px] flex-col gap-2">
        <Label htmlFor="frameworks-combobox">Frameworks</Label>
        <Combobox items={FRAMEWORKS} multiple value={value} onValueChange={setValue}>
          <ComboboxChips>
            <ComboboxValue>
              {value.map((item) => (
                <ComboboxChip key={item}>{item}</ComboboxChip>
              ))}
            </ComboboxValue>
            <ComboboxChipsInput id="frameworks-combobox" placeholder="Add framework" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  }
}
