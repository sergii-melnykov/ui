export interface PageLoaderProps {
  /**
   * Optional className to extend the component's styles
   */
  className?: string
  /**
   * Optional size of the loader (default: "default")
   */
  size?: "sm" | "default" | "lg"
  /**
   * Optional text to display below the loader
   */
  text?: string
  /**
   * Optional color of the loader (default: "primary")
   */
  color?: "primary" | "secondary" | "accent" | "muted" | "destructive" | string
}
