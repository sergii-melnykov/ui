import React from "react"
import { DropzoneOptions } from "react-dropzone"

/**
 * Props interface for the DndInput component.
 * Extends react-dropzone's DropzoneOptions to provide file drag-and-drop functionality.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-dnd-input--docs
 *
 * @example
 * ```tsx
 * <DndInput
 *   onDrop={(acceptedFiles) => console.log(acceptedFiles)}
 *   accept={{ 'image/*': ['.png', '.jpg'] }}
 * >
 *   <CustomUploadContent />
 * </DndInput>
 * ```
 */
export interface DndInputProps extends DropzoneOptions {
  /** Additional CSS class name for styling the dropzone container */
  className?: string
  /** Custom content to render inside the dropzone. If not provided, a default upload UI will be shown */
  children?: React.ReactNode
}
