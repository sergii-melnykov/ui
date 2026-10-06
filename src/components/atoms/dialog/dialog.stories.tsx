import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../button/button"
import { Input } from "../input/input"
import { Label } from "../label/label"

import { DialogDesignSpec } from "./dialog-design-spec"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./dialog"

const meta: Meta<typeof Dialog> = {
  title: "Atoms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean"
    }
  }
}

export default meta
type Story = StoryObj<typeof Dialog>

export const DesignSpec: Story = {
  render: () => <DialogDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a description of the dialog content.</DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm">Dialog content goes here.</p>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button size="sm">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const NoCloseButton: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button in the top-right corner.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export const CustomCloseButton: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent showCloseButton={false} className="gap-0 overflow-hidden p-0 sm:max-w-[448px]">
        <div className="flex flex-col gap-4 p-4 pb-0">
          <DialogHeader className="p-0">
            <div className="flex items-start justify-between gap-2">
              <DialogTitle className="flex-1">Share link</DialogTitle>
              <DialogCloseButton />
            </div>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <Input readOnly defaultValue="https://ui.shadcn.com/docs/installation" className="h-8" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ScrollableContent: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(443px,85vh)] flex-col gap-0 overflow-hidden p-4 sm:max-w-[448px]"
      >
        <DialogHeader className="shrink-0 p-0">
          <div className="flex items-start justify-between gap-2">
            <DialogTitle className="flex-1">Scrollable Content</DialogTitle>
            <DialogCloseButton />
          </div>
          <DialogDescription>This is a dialog with scrollable content.</DialogDescription>
        </DialogHeader>
        <DialogBody className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm text-foreground">
          {Array.from({ length: 9 }).map((_, index) => (
            <p key={index}>{LOREM}</p>
          ))}
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export const StickyFooter: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(517px,85vh)] flex-col gap-0 overflow-hidden p-0"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4 pb-0">
          <DialogHeader className="p-0">
            <div className="flex items-start justify-between gap-2">
              <DialogTitle className="flex-1">Sticky Footer</DialogTitle>
              <DialogCloseButton />
            </div>
            <DialogDescription>
              This dialog has a sticky footer that stays visible while the content scrolls.
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-4 text-sm text-foreground">
            {Array.from({ length: 9 }).map((_, index) => (
              <p key={index}>{LOREM}</p>
            ))}
          </DialogBody>
        </div>
        <DialogFooter className="shrink-0 sm:justify-end">
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Form Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-2">
            <DialogTitle className="flex-1">Edit profile</DialogTitle>
            <DialogCloseButton />
          </div>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" defaultValue="@peduarte" />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button size="sm" variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button size="sm" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
