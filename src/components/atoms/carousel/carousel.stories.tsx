import type { Meta, StoryObj } from "@storybook/react-vite"

import { Card, CardContent } from "@/components/molecules/card/card"

import { CarouselDesignSpec } from "./carousel-design-spec"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "./carousel"

const meta: Meta<typeof Carousel> = {
  title: "Atoms/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Carousel>

export const DesignSpec: Story = {
  render: () => <CarouselDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Carousel className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
