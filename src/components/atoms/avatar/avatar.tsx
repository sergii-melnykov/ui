import React from "react"
import { cn } from "../../../utils/cn"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The image source for the avatar
   */
  src?: string
  /**
   * The fallback text to display when image fails to load
   */
  fallback?: string
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl"
  /**
   * Whether the avatar is rounded
   * @default true
   */
  rounded?: boolean
  /**
   * Alt text for the image
   */
  alt?: string
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg"
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, size = "md", rounded = true, alt, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false)
    const initials = fallback
      ? fallback
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : ""

    const handleImageError = () => {
      setImgError(true)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gray-100 font-medium text-gray-600",
          sizeClasses[size],
          rounded ? "rounded-full" : "rounded-md",
          className
        )}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt || fallback || "Avatar"}
            className="h-full w-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">{initials}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"
