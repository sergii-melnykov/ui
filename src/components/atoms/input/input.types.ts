import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import type { inputVariants } from "./input.variants"

export interface InputProps
  extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {}
