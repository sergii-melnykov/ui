/**
 * Toaster component for managing and displaying toast notifications.
 * Built on top of the Toast primitive components.
 *
 * @url https://sergii-melnykov.github.io/ui/?path=/docs/atoms-toaster--docs
 *
 * @example
 * ```tsx
 * // Add Toaster to your app's root layout
 * <Toaster />
 *
 * // Use the toast hook to show notifications
 * const { toast } = useToast()
 *
 * toast({
 *   title: "Success",
 *   description: "Your changes have been saved.",
 *   action: <ToastAction altText="Undo">Undo</ToastAction>
 * })
 * ```
 */

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@/components/atoms/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
