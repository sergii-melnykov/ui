import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Label } from "@/components/atoms/label"

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
export type RadioItemContainerProps = React.HTMLAttributes<HTMLDivElement>
export type RadioItemLabelProps = React.ComponentPropsWithoutRef<typeof Label>
