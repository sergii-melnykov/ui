import { cva } from "class-variance-authority"

export const questionnaireChoiceVariants = cva(
  [
    "group/questionnaire-choice flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-left transition-colors",
    "hover:bg-muted/50",
    "has-disabled:cursor-not-allowed has-disabled:opacity-50",
    "has-[:checked]:border-foreground/40 has-[:checked]:bg-muted",
    "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50"
  ].join(" ")
)

export const questionnaireChoiceIndicatorVariants = cva(
  "relative flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors group-has-[:checked]/questionnaire-choice:border-primary group-has-[:checked]/questionnaire-choice:bg-primary"
)
