import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"

import { FormCombobox } from "./combobox"

const FRAMEWORK_OPTIONS = [
  { id: "next", label: "Next.js" },
  { id: "svelte", label: "SvelteKit" },
  { id: "nuxt", label: "Nuxt.js" },
  { id: "remix", label: "Remix" },
  { id: "astro", label: "Astro" }
]

const meta: Meta<typeof FormCombobox> = {
  title: "Form/Combobox",
  component: FormCombobox,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      const schema = z.object({
        framework: z.string().min(1, "Choose a framework"),
        frameworks: z.array(z.string()).min(1, "Pick at least one")
      })

      const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: { framework: "", frameworks: [] as string[] },
        mode: "onSubmit"
      })

      return (
        <FormProvider {...methods}>
          <form
            className="flex w-[320px] flex-col gap-6"
            onSubmit={(event) => {
              void methods.handleSubmit(() => undefined)(event)
            }}
          >
            <Story />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      )
    }
  ],
  tags: ["autodocs"]
}

export default meta
type Story = StoryObj<typeof FormCombobox>

export const Single: Story = {
  args: {
    name: "framework",
    label: "Framework",
    placeholder: "Search frameworks…",
    options: FRAMEWORK_OPTIONS,
    fullWidth: true,
    showClear: true
  }
}

export const Multiple: Story = {
  args: {
    name: "frameworks",
    label: "Frameworks",
    placeholder: "Add frameworks…",
    options: FRAMEWORK_OPTIONS,
    multiple: true,
    fullWidth: true
  }
}
