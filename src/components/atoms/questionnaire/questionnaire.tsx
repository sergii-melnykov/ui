"use client"

import * as React from "react"
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"

import { Button } from "@/components/atoms/button/button"
import { cn } from "@/utils/index"

import type { QuestionnaireNavigationButtonProps } from "./questionnaire.types"
import {
  questionnaireChoiceIndicatorVariants,
  questionnaireChoiceVariants
} from "./questionnaire.variants"

function QuestionnaireChoiceIndicator() {
  return (
    <span
      aria-hidden
      data-slot="questionnaire-choice-indicator"
      className={questionnaireChoiceIndicatorVariants()}
    >
      <span className="size-2 rounded-full bg-primary-foreground opacity-0 transition-opacity group-has-[:checked]/questionnaire-choice:opacity-100" />
    </span>
  )
}

function Questionnaire({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

function QuestionnaireProgress({
  className,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      className={cn("text-xs font-medium leading-4 text-muted-foreground", className)}
      {...props}
    >
      {children}
    </QuestionnairePrimitive.Progress>
  )
}

function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn("m-0 flex min-w-0 flex-col gap-4 border-0 p-0", className)}
      {...props}
    />
  )
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn("text-base font-medium leading-6 tracking-normal text-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn("text-sm font-normal leading-5 text-muted-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function QuestionnaireChoice({
  className,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(questionnaireChoiceVariants(), className)}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput className="peer sr-only" />
      <QuestionnaireChoiceIndicator />
      <QuestionnairePrimitive.ChoiceLabel className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-5">
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        className={cn(
          "inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-background font-mono text-[10px] leading-5 text-muted-foreground"
        )}
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <QuestionnairePrimitive.Input
      data-slot="questionnaire-input"
      className={cn(
        "flex h-8 w-full rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireError({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
}

function QuestionnaireActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn("flex w-full flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

function questionnaireNavButtonClassName(className?: string, propsClassName?: string) {
  return cn(className, propsClassName)
}

function QuestionnairePrevious({
  className,
  size = "default",
  variant = "outline",
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
  QuestionnaireNavigationButtonProps) {
  return (
    <QuestionnairePrimitive.Previous
      render={(buttonProps, state) => {
        const { children: primitiveChildren, className: primitiveClassName, ...buttonRest } =
          buttonProps

        return (
          <Button
            {...buttonRest}
            type={buttonRest.type as "button"}
            variant={variant}
            size={size}
            disabled={state.disabled}
            className={questionnaireNavButtonClassName(
              className,
              primitiveClassName as string | undefined
            )}
          >
            {children ?? (primitiveChildren as React.ReactNode) ?? "Previous"}
          </Button>
        )
      }}
      {...props}
    />
  )
}

function QuestionnaireSkip({
  className,
  size = "default",
  variant = "outline",
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> & QuestionnaireNavigationButtonProps) {
  return (
    <QuestionnairePrimitive.Skip
      render={(buttonProps, state) => {
        const { children: primitiveChildren, className: primitiveClassName, ...buttonRest } =
          buttonProps

        return (
          <Button
            {...buttonRest}
            type={buttonRest.type as "button"}
            variant={variant}
            size={size}
            disabled={state.disabled}
            className={questionnaireNavButtonClassName(
              className,
              primitiveClassName as string | undefined
            )}
          >
            {children ?? (primitiveChildren as React.ReactNode) ?? "Skip"}
          </Button>
        )
      }}
      {...props}
    />
  )
}

function QuestionnaireNext({
  className,
  size = "default",
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> & QuestionnaireNavigationButtonProps) {
  return (
    <QuestionnairePrimitive.Next
      render={(buttonProps, state) => {
        const { children: primitiveChildren, className: primitiveClassName, ...buttonRest } =
          buttonProps

        return (
          <Button
            {...buttonRest}
            type={buttonRest.type as "button"}
            variant={variant}
            size={size}
            disabled={state.disabled}
            className={questionnaireNavButtonClassName(
              className,
              primitiveClassName as string | undefined
            )}
          >
            {children ?? (primitiveChildren as React.ReactNode) ?? "Next"}
          </Button>
        )
      }}
      {...props}
    />
  )
}

function QuestionnaireSubmit({
  className,
  size = "default",
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
  QuestionnaireNavigationButtonProps) {
  return (
    <QuestionnairePrimitive.Submit
      render={(buttonProps, state) => {
        const { children: primitiveChildren, className: primitiveClassName, ...buttonRest } =
          buttonProps

        return (
          <Button
            {...buttonRest}
            type={buttonRest.type as "submit"}
            variant={variant}
            size={size}
            disabled={state.disabled}
            className={questionnaireNavButtonClassName(
              className,
              primitiveClassName as string | undefined
            )}
          >
            {children ?? (primitiveChildren as React.ReactNode) ?? "Submit"}
          </Button>
        )
      }}
      {...props}
    />
  )
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle
}
