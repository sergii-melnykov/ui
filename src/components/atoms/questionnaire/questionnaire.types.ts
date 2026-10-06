import type { ComponentProps } from "react"

import type { ButtonProps } from "@/components/atoms/button/button.types"

export type {
  QuestionnaireChoiceDefinition,
  QuestionnaireInputType,
  QuestionnaireItemDefinition,
  QuestionnaireItemStatus,
  QuestionnaireShortcutMode
} from "@shadcn/react/questionnaire"

export type QuestionnaireNavigationButtonProps = Pick<
  ButtonProps,
  "className" | "size" | "variant"
> &
  Omit<ComponentProps<"button">, "size">
