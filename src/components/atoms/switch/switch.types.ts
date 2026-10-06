import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { type VariantProps } from "class-variance-authority"

import { switchVariants } from "./switch.variants"

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
  VariantProps<typeof switchVariants>
