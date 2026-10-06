import { cva } from "class-variance-authority"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 border-border pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl leading-7 text-muted-foreground [&:not(:first-child)]:mt-6",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      "inline-code":
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify"
    }
  },
  defaultVariants: {
    variant: "p",
    align: "left"
  }
})

const typographyDefaultElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  list: "ul",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
  "inline-code": "code"
} as const

const typographyTableClasses = {
  root: "my-6 w-full overflow-y-auto",
  table: "w-full",
  row: "m-0 border-t p-0 even:bg-muted",
  headCell:
    "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
  cell: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
} as const

export { typographyDefaultElement, typographyTableClasses, typographyVariants }
