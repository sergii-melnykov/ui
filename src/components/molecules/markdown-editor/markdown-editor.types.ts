/* eslint-disable no-unused-vars */
export interface MarkdownEditorProps {
  /**
   * current value of the editor
   */
  value?: string
  /**
   * callback when value changes
   */
  onChange?: (value: string) => void
  /**
   * additional class name
   */
  className?: string
  /**
   * placeholder text
   */
  placeholder?: string
  /**
   * whether the editor is disabled
   */
  disabled?: boolean
}
