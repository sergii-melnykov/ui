import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetCloseButton,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./sheet"
import { SheetDesignSpec } from "./sheet-design-spec"
import { Button } from "../button/button"
import { Input } from "../input/input"
import { Label } from "../label/label"

const meta: Meta<typeof Sheet> = {
  title: "Atoms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean"
    }
  }
}

export default meta
type Story = StoryObj<typeof Sheet>

export const DesignSpec: Story = {
  render: () => <SheetDesignSpec />
}

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="flex-1">Sheet Title</SheetTitle>
            <SheetCloseButton />
          </div>
          <SheetDescription>This is a description of the sheet content.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>Sheet content goes here.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  )
}

export const RightSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="flex-1">Right Sheet</SheetTitle>
            <SheetCloseButton />
          </div>
          <SheetDescription>This sheet appears from the right side.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p>Sheet content goes here.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  )
}

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Form Sheet</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="flex-1">Form Sheet</SheetTitle>
            <SheetCloseButton />
          </div>
          <SheetDescription>Fill out the form below to submit your information.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <form className="flex flex-col gap-4 pb-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-form-name">Name</Label>
              <Input id="sheet-form-name" placeholder="Enter your name" className="h-8" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-form-email">Email</Label>
              <Input
                id="sheet-form-email"
                type="email"
                placeholder="Enter your email"
                className="h-8"
              />
            </div>
          </form>
        </SheetBody>
        <SheetFooter>
          <Button size="sm" className="w-full" type="submit">
            Submit
          </Button>
          <SheetClose asChild>
            <Button size="sm" variant="outline" className="w-full">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const WithNavigation: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Navigation</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="flex-1">Navigation</SheetTitle>
            <SheetCloseButton />
          </div>
          <SheetDescription>Browse through the available options.</SheetDescription>
        </SheetHeader>
        <SheetBody>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              >
                Help
              </a>
            </li>
          </ul>
        </nav>
        </SheetBody>
      </SheetContent>
    </Sheet>
  )
}
