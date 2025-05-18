import { TextareaHTMLAttributes } from "react"

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Whether the textarea should automatically resize
   */
  autoResize?: boolean
}
