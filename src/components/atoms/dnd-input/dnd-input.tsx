"use client"

import React from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/utils"
import { UploadIcon } from "lucide-react" // or your icon

import type { DndInputProps } from "./dnd-input.types"

/**
 * Default content shown when no children are provided to the DndInput component.
 * Displays an upload icon, text prompt, and file type information.
 */
const defaultContent = (
  <>
    <UploadIcon className="text-blue-600 mr-2" aria-hidden="true" />
    <span>
      <span className="underline">Upload</span> or drop a file right here
    </span>
    <span className="ml-auto text-gray-400 text-sm">all file types</span>
  </>
)

/**
 * DndInput is a drag-and-drop file upload component built on top of react-dropzone.
 * It provides a customizable dropzone area for file uploads with visual feedback for drag states.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-dnd-input--docs
 *
 * @example
 * ```tsx
 * // Basic usage with default UI
 * <DndInput onDrop={(files) => handleFiles(files)} />
 *
 * // Custom content with file type restrictions
 * <DndInput
 *   accept={{ 'image/*': ['.png', '.jpg'] }}
 *   onDrop={(files) => handleFiles(files)}
 * >
 *   <div>Custom upload UI</div>
 * </DndInput>
 * ```
 */
export const DndInput: React.FC<DndInputProps> = ({
  onDrop,
  accept,
  className,
  children,
  ...props
}) => {
  // Initialize dropzone functionality with provided options
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept,
    ...props
  })

  return (
    <div
      {...getRootProps({
        className: cn(
          // Base styles for the dropzone container
          "flex items-center border-2 border-dashed border-blue-500 rounded-lg p-4 cursor-pointer transition-colors",
          // Custom className prop for additional styling
          className,
          // Visual feedback for drag state
          isDragActive ? "bg-blue-50 border-blue-700" : "",
          // Visual feedback for focus state
          isFocused ? "ring-2 ring-blue-400" : ""
        ),
        "aria-label": "File upload area",
        tabIndex: 0,
        role: "button"
      })}
      data-testid="dnd-input"
    >
      <input {...getInputProps()} />
      {children || defaultContent}
    </div>
  )
}
