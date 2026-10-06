import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronRight } from "lucide-react"

import { Label } from "@/components/atoms/label/label"
import {
  NativeSelect,
  NativeSelectOption
} from "@/components/atoms/native-select/native-select"

import { PaginationDesignSpec } from "./pagination-design-spec"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "."

const meta: Meta<typeof Pagination> = {
  title: "Atoms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
}

export default meta
type Story = StoryObj<typeof Pagination>

export const DesignSpec: Story = {
  render: () => <PaginationDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Simple: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        {[1, 2, 3, 4, 5].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === 2}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export const IconsOnly: Story = {
  name: "Icons only",
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="pagination-rows">Rows per page</Label>
        <NativeSelect id="pagination-rows" size="sm" className="w-20 rounded-lg" defaultValue="25">
          <NativeSelectOption value="10">10</NativeSelectOption>
          <NativeSelectOption value="25">25</NativeSelectOption>
          <NativeSelectOption value="50">50</NativeSelectOption>
        </NativeSelect>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" showIcon={false} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export const Rtl: Story = {
  name: "RTL",
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationNext href="#" showIcon={false}>
            التالي
          </PaginationNext>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">٣</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            ٢
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">١</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size="default"
            aria-label="Go to previous page"
            className="h-8 gap-1 rounded-full px-2.5"
          >
            <span>السابق</span>
            <ChevronRight className="size-4" aria-hidden />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export const WithManyPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
