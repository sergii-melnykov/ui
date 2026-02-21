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
  /**
   * callback when key is pressed
   */
  onKeyDown?: (event: KeyboardEvent) => void
  /**
   * whether to focus the editor on mount
   */
  autoFocus?: boolean
  /**
   * whether to immediately render the editor
   */
  immediatelyRender?: boolean
  /**
   * callback when editor loses focus
   */
  onBlur?: (event: FocusEvent) => void
  /**
   * callback when editor gains focus
   */
  onFocus?: (event: FocusEvent) => void
}
