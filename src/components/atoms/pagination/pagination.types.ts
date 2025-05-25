import * as React from "react"
import { ButtonProps } from "@/components/atoms/button"

export type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">
