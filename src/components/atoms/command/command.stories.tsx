import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar, Calculator, CreditCard, Settings, Smile, UserRound } from "lucide-react"

import { CommandDesignSpec } from "./command-design-spec"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "."

const meta = {
  title: "Atoms/Command",
  component: Command,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const DesignSpec: Story = {
  render: () => <CommandDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Command className="w-96 border border-border shadow-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserRound />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const WithShortcuts: Story = {
  render: () => (
    <Command className="w-96 border border-border shadow-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserRound />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const Scrollable: Story = {
  render: () => (
    <Command className="flex h-[332px] w-96 flex-col overflow-hidden border border-border shadow-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="min-h-0 flex-1 overflow-y-auto">
        <CommandGroup heading="Navigation">
          <CommandItem>
            Home
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Inbox
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const Rtl: Story = {
  render: () => (
    <Command dir="rtl" className="w-96 border border-border shadow-sm">
      <CommandInput placeholder="اكتب أمرًا أو ابحث..." />
      <CommandList>
        <CommandGroup heading="اقتراحات">
          <CommandItem>
            التقويم
            <Calendar />
          </CommandItem>
          <CommandItem>
            البحث عن الرموز التعبيرية
            <Smile />
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="الإعدادات">
          <CommandItem>
            <CommandShortcut className="ms-0 me-auto">P⌘</CommandShortcut>
            الملف الشخصي
            <UserRound />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const WithGroups: Story = {
  name: "With groups",
  render: () => (
    <Command className="w-96 border border-border shadow-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile />
            Search Emoji
          </CommandItem>
          <CommandItem>
            <Calculator />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserRound />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
