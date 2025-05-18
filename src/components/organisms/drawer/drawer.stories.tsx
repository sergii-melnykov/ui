import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../atoms/button/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./drawer"

const meta: Meta<typeof Drawer> = {
  title: "Organisms/Drawer",
  component: Drawer,
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>This is a description of the drawer content.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Drawer content goes here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithLongContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Long Content Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Long Content Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer contains a lot of content to demonstrate scrolling.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              This is paragraph {i + 1} of the long content. The drawer should scroll when content
              exceeds the viewport height.
            </p>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
