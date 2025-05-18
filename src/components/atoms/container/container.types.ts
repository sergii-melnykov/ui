import { HTMLAttributes } from "react"

export type ContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "full" | false

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The maximum width of the container
   * @default "lg"
   */
  maxWidth?: ContainerMaxWidth
  /**
   * Whether to disable the default padding
   * @default false
   */
  disablePadding?: boolean
  /**
   * Whether to make the container fluid (no max-width)
   * @default false
   */
  fluid?: boolean
}
