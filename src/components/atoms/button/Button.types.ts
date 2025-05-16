export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "outline" | "ghost"

  /**
   * The size of the button
   * @default 'md'
   */
  size?: "sm" | "md" | "lg"

  /**
   * The color scheme of the button
   * @default 'default'
   */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"

  /**
   * Icon to display at the start of the button
   */
  startIcon?: React.ReactNode

  /**
   * Icon to display at the end of the button
   */
  endIcon?: React.ReactNode

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean

  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean

  /**
   * The content of the button
   */
  children: React.ReactNode
}
