/**
 * Storybook-only layout mirroring the Figma Questionnaire documentation page.
 * Not exported from the library package.
 */

"use client"

import * as React from "react"
import { ArrowUpRight, X } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/molecules/card/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/atoms/dialog/dialog"
import { NativeSelect, NativeSelectOption } from "@/components/atoms/native-select/native-select"
import { Progress } from "@/components/atoms/progress/progress"
import { cn } from "@/utils/index"

import { questionnaireChoiceVariants } from "./questionnaire.variants"
import {
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
} from "./questionnaire"

function PreviewBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center rounded-2xl border border-border p-10",
        className
      )}
    >
      {children}
    </div>
  )
}

function ExampleBlock({
  title,
  description,
  children
}: {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      <p className="pt-4 text-base text-muted-foreground">{description}</p>
      <div className="pt-6">{children}</div>
    </div>
  )
}

function StaticChoice({
  label,
  description,
  shortcut,
  state = "default",
  dir
}: {
  label: string
  description?: string
  shortcut?: string
  state?: "default" | "hover" | "checked"
  dir?: "ltr" | "rtl"
}) {
  return (
    <div
      dir={dir}
      className={cn(
        questionnaireChoiceVariants(),
        state === "hover" && "bg-muted/50",
        state === "checked" && "border-foreground/40 bg-muted"
      )}
    >
      <span
        className={cn(
          "relative flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background",
          state === "checked" && "border-primary bg-primary"
        )}
      >
        {state === "checked" ? (
          <span className="size-2 rounded-full bg-primary-foreground" />
        ) : null}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-5">
        <span className="font-medium text-foreground">{label}</span>
        {description ? <span className="text-muted-foreground">{description}</span> : null}
      </span>
      {shortcut ? (
        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-background font-mono text-[10px] text-muted-foreground">
          {shortcut}
        </span>
      ) : null}
    </div>
  )
}

export function QuestionnaireDesignSpec() {
  const [activeItem, setActiveItem] = React.useState("scope")

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 rounded-xl border border-border bg-background p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-9 text-foreground">Questionnaire</h1>
          <p className="text-base text-muted-foreground">
            A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable
            questions.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 shadow-xs" asChild>
          <a
            href="https://ui.shadcn.com/docs/components/questionnaire"
            target="_blank"
            rel="noreferrer"
          >
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-foreground">Components</h2>
        <h3 className="text-xl font-semibold text-foreground">Questionnaire choice</h3>
        <div className="overflow-x-auto rounded-xl border border-border p-5">
          <div className="grid min-w-[720px] grid-cols-[100px_1fr_1fr] gap-x-6 gap-y-4">
            <div />
            <p className="text-center text-sm font-medium text-foreground">LTR</p>
            <p className="text-center text-sm font-medium text-foreground">RTL</p>
            <p className="self-center text-sm text-muted-foreground">Default</p>
            <StaticChoice label="Questionnaire choice label" description="Questionnaire choice label" shortcut="A" />
            <StaticChoice
              label="Questionnaire choice label"
              description="Questionnaire choice label"
              shortcut="A"
              dir="rtl"
            />
            <p className="self-center text-sm text-muted-foreground">Hover</p>
            <StaticChoice label="Questionnaire choice label" description="Questionnaire choice label" shortcut="A" state="hover" />
            <StaticChoice
              label="Questionnaire choice label"
              description="Questionnaire choice label"
              shortcut="A"
              state="hover"
              dir="rtl"
            />
            <p className="self-center text-sm text-muted-foreground">Checked</p>
            <StaticChoice label="Questionnaire choice label" description="Questionnaire choice label" shortcut="A" state="checked" />
            <StaticChoice
              label="Questionnaire choice label"
              description="Questionnaire choice label"
              shortcut="A"
              state="checked"
              dir="rtl"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-10">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <ExampleBlock
          title="Multiple Selection"
          description="Use multiple for an item that accepts more than one fixed answer."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "context",
                  required: true,
                  choices: [
                    { value: "files" },
                    { value: "tests" },
                    { value: "docs" },
                    { value: "history" }
                  ]
                }
              ]}
              shortcuts="letters"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireItem name="context" multiple required>
                <QuestionnaireTitle>What context should the agent inspect?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Select every source that may affect the implementation.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="files">
                    <span className="font-medium">Relevant source files</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="tests" defaultChecked>
                    <span className="font-medium">Existing tests</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="docs">
                    <span className="font-medium">Architecture documentation</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="history">
                    <span className="font-medium">Recent commit history</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Freeform Answer"
          description="Compose QuestionnaireInput with fixed choices when the user can provide another answer."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "approach",
                  required: true,
                  choices: [
                    { value: "minimal" },
                    { value: "full" },
                    { value: "tests" }
                  ]
                }
              ]}
              shortcuts="letters"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireItem name="approach" required>
                <QuestionnaireTitle>How should the agent approach this refactor?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Choose a strategy or write a more specific instruction.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="minimal">
                    <span className="font-medium">Minimal diff</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="full">
                    <span className="font-medium">Full refactor</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="tests">
                    <span className="font-medium">Tests first</span>
                  </QuestionnaireChoice>
                  <QuestionnaireInput
                    aria-label="Another approach"
                    placeholder="Describe another approach…"
                  />
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireSubmit>Apply strategy</QuestionnaireSubmit>
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Progress"
          description="QuestionnaireProgress exposes the active step for multi-item flows."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "category",
                  required: true,
                  choices: [
                    { value: "feature" },
                    { value: "fix" },
                    { value: "refactor" }
                  ]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress />
              <QuestionnaireItem name="category" required>
                <QuestionnaireTitle>What kind of change is this?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Choose the category that best describes the work.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="feature">
                    <span className="font-medium">New feature</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="fix">
                    <span className="font-medium">Bug fix</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="refactor">
                    <span className="font-medium">Refactor</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireNext />
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Explicit Skip"
          description="Add QuestionnaireSkip when an optional item may be intentionally left unanswered."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "priority",
                  required: true,
                  choices: [{ value: "high" }, { value: "medium" }, { value: "low" }]
                },
                {
                  name: "notes",
                  required: false,
                  choices: [{ value: "yes" }, { value: "no" }]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress />
              <QuestionnaireItem name="priority" required>
                <QuestionnaireTitle>What priority should this work have?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Choose the urgency for the next agent run.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="high">
                    <span className="font-medium">High</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="medium">
                    <span className="font-medium">Medium</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="low">
                    <span className="font-medium">Low</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem name="notes" required={false}>
                <QuestionnaireTitle>Add implementation notes?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Optional context for the next step.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="yes">
                    <span className="font-medium">Yes, add notes</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="no">
                    <span className="font-medium">No notes needed</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-between">
                <QuestionnairePrevious />
                <div className="ml-auto flex items-center gap-2">
                  <QuestionnaireSkip />
                  <QuestionnaireNext />
                  <QuestionnaireSubmit />
                </div>
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Shortcuts"
          description="Assign a letter or number key to each answer with shortcuts."
        >
          <PreviewBox>
            <div className="relative w-full max-w-[446px]">
              <NativeSelect className="absolute right-0 top-0 w-[114px]" defaultValue="letters">
                <NativeSelectOption value="letters">Letters</NativeSelectOption>
                <NativeSelectOption value="numbers">Numbers</NativeSelectOption>
              </NativeSelect>
              <Questionnaire
                className="w-full pt-16"
                items={[
                  {
                    name: "next",
                    required: true,
                    choices: [
                      { value: "research" },
                      { value: "implement" },
                      { value: "verify" }
                    ]
                  }
                ]}
                shortcuts="letters"
                onSubmit={(event) => {
                event.preventDefault()
              }}
              >
                <QuestionnaireItem name="next" required>
                  <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
                  <QuestionnaireDescription>
                    Use the displayed shortcut or navigate with the keyboard.
                  </QuestionnaireDescription>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="research">
                      <span className="font-medium">Research first</span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="implement">
                      <span className="font-medium">Implement now</span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="verify">
                      <span className="font-medium">Verify only</span>
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </QuestionnaireItem>
                <QuestionnaireActions className="justify-end">
                  <QuestionnaireSubmit>Continue</QuestionnaireSubmit>
                </QuestionnaireActions>
              </Questionnaire>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Validation"
          description="Combine controlled navigation with an external schema such as Zod to return to an invalid item and present its error."
        >
          <PreviewBox>
            <Card className="w-full max-w-[448px] gap-0 overflow-hidden pt-4">
              <Questionnaire
                className="gap-0"
                items={[
                  {
                    name: "detail",
                    required: true,
                    choices: [
                      { value: "concise" },
                      { value: "complete" }
                    ]
                  }
                ]}
                onSubmit={(event) => {
                event.preventDefault()
              }}
              >
                <QuestionnaireItem name="detail" required className="gap-4">
                  <CardHeader className="border-b-0 pb-0">
                    <div className="flex w-full items-start gap-1">
                      <div className="min-w-0 flex-1">
                        <QuestionnaireTitle>
                          How much detail should the answer include?
                        </QuestionnaireTitle>
                        <QuestionnaireDescription>
                          Choose the response depth.
                        </QuestionnaireDescription>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground">
                        1/2
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pt-0">
                    <QuestionnaireChoices>
                      <QuestionnaireChoice value="concise" defaultChecked>
                        <span className="font-medium">Concise summary</span>
                      </QuestionnaireChoice>
                      <QuestionnaireChoice value="complete">
                        <span className="font-medium">Complete answer</span>
                      </QuestionnaireChoice>
                    </QuestionnaireChoices>
                    <QuestionnaireError />
                  </CardContent>
                </QuestionnaireItem>
                <CardFooter className="border-t bg-muted/50">
                  <QuestionnaireActions className="w-full justify-end">
                    <QuestionnaireNext size="sm" className="w-full sm:w-auto">
                      Next
                    </QuestionnaireNext>
                  </QuestionnaireActions>
                </CardFooter>
              </Questionnaire>
            </Card>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control the active item from host state, such as returning to an invalid step."
        >
          <PreviewBox>
            <div className="flex w-full max-w-[446px] flex-col gap-6">
              <p className="text-right text-sm text-muted-foreground">
                Current checkpoint: Change scope
              </p>
              <Questionnaire
                item={activeItem}
                onItemChange={setActiveItem}
                items={[
                  {
                    name: "scope",
                    required: true,
                    choices: [
                      { value: "component" },
                      { value: "feature" },
                      { value: "area" }
                    ]
                  }
                ]}
                onSubmit={(event) => {
                event.preventDefault()
              }}
              >
                <QuestionnaireProgress />
                <QuestionnaireItem name="scope" required>
                  <QuestionnaireTitle>What may the agent change?</QuestionnaireTitle>
                  <QuestionnaireDescription>
                    The host stores the active checkpoint while Questionnaire navigates.
                  </QuestionnaireDescription>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="component">
                      <span className="font-medium">Only the target component</span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="feature">
                      <span className="font-medium">Component and related tests</span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="area">
                      <span className="font-medium">The complete feature area</span>
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </QuestionnaireItem>
                <QuestionnaireActions className="justify-end">
                  <QuestionnaireNext />
                </QuestionnaireActions>
              </Questionnaire>
            </div>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Resume"
          description="Restore a saved active item and default answers, then reset changes back to that saved state."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              defaultItem="verify"
              items={[
                {
                  name: "category",
                  required: true,
                  choices: [{ value: "feature" }, { value: "fix" }, { value: "refactor" }]
                },
                {
                  name: "verify",
                  required: true,
                  choices: [{ value: "unit" }, { value: "e2e" }, { value: "manual" }]
                },
                {
                  name: "deploy",
                  required: true,
                  choices: [{ value: "staging" }, { value: "production" }]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress />
              <QuestionnaireItem name="category" required>
                <QuestionnaireTitle>What kind of change is this?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Choose the category that best describes the work.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="feature">
                    <span className="font-medium">New feature</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="fix">
                    <span className="font-medium">Bug fix</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="refactor">
                    <span className="font-medium">Refactor</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem name="verify" required>
                <QuestionnaireTitle>How should the migration be verified?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  These checks were selected during the previous session.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="unit" defaultChecked>
                    <span className="font-medium">Unit tests</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="e2e" defaultChecked>
                    <span className="font-medium">End-to-end tests</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="manual">
                    <span className="font-medium">Manual QA</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem name="deploy" required>
                <QuestionnaireTitle>Where should this deploy first?</QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="staging">
                    <span className="font-medium">Staging</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="production">
                    <span className="font-medium">Production</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-between">
                <QuestionnairePrevious />
                <div className="ml-auto flex items-center gap-2">
                  <QuestionnaireSkip />
                  <QuestionnaireNext />
                  <QuestionnaireSubmit />
                </div>
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Conditional Items"
          description="Disable items that do not apply to the user's earlier answers."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "run",
                  required: true,
                  choices: [{ value: "local" }, { value: "cloud" }]
                },
                {
                  name: "environment",
                  required: true,
                  disabled: true,
                  choices: [{ value: "staging" }, { value: "production" }]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress />
              <QuestionnaireItem name="run" required>
                <QuestionnaireTitle>Where should the agent run?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Cloud runs add an environment question to this flow.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="local">
                    <span className="font-medium">Local workspace</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="cloud">
                    <span className="font-medium">Cloud agent</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem name="environment" required disabled>
                <QuestionnaireTitle>Which environment should be used?</QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="staging">
                    <span className="font-medium">Staging</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="production">
                    <span className="font-medium">Production</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireNext />
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Navigation State"
          description="Read item status to opt into disabled navigation and custom action styling."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "scope",
                  required: true,
                  choices: [{ value: "component" }, { value: "feature" }, { value: "area" }]
                },
                {
                  name: "followup",
                  required: true,
                  choices: [{ value: "tests" }, { value: "docs" }]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress />
              <QuestionnaireItem name="scope" required>
                <QuestionnaireTitle>What may the agent modify?</QuestionnaireTitle>
                <QuestionnaireDescription>
                  Next is intentionally disabled until an answer is selected.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="component">
                    <span className="font-medium">Only the target component</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="feature">
                    <span className="font-medium">Component and related tests</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="area">
                    <span className="font-medium">The complete feature area</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem name="followup" required>
                <QuestionnaireTitle>What should be updated next?</QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="tests">
                    <span className="font-medium">Tests</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="docs">
                    <span className="font-medium">Documentation</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireNext />
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Progress"
          description="Use the Progress render state to build a custom progress indicator."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[448px]"
              items={[
                {
                  name: "size",
                  required: true,
                  choices: [
                    { value: "small" },
                    { value: "medium" },
                    { value: "large" }
                  ]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress
                render={(_props, state) => (
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex gap-1.5">
                      {Array.from({ length: state.total || 4 }).map((_, index) => (
                        <Progress
                          key={index}
                          value={index < state.current ? 100 : index === state.current - 1 ? 35 : 0}
                          className="h-1.5 flex-1"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Checkpoint {state.current} of {state.total}
                    </span>
                  </div>
                )}
              />
              <QuestionnaireItem name="size" required>
                <QuestionnaireTitle>How large is the change?</QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="small">
                    <span className="font-medium">Small</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="medium">
                    <span className="font-medium">Medium</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="large">
                    <span className="font-medium">Large</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireNext />
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Animated Items"
          description="Animate the active item while keeping progress and navigation stationary."
        >
          <PreviewBox>
            <Questionnaire
              className="w-full max-w-[446px]"
              items={[
                {
                  name: "task",
                  required: true,
                  choices: [{ value: "research" }, { value: "implement" }, { value: "verify" }]
                },
                {
                  name: "depth",
                  required: true,
                  choices: [{ value: "quick" }, { value: "thorough" }]
                },
                {
                  name: "handoff",
                  required: true,
                  choices: [{ value: "summary" }, { value: "detailed" }]
                }
              ]}
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <QuestionnaireProgress />
              <QuestionnaireItem
                name="task"
                required
                className="duration-300 data-[active]:animate-in data-[active]:fade-in-0 data-[active]:slide-in-from-bottom-2"
              >
                <QuestionnaireTitle>What should the agent do?</QuestionnaireTitle>
                <QuestionnaireDescription>Choose the task for this run.</QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="research">
                    <span className="font-medium">Research first</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="implement">
                    <span className="font-medium">Implement now</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="verify">
                    <span className="font-medium">Verify only</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem
                name="depth"
                required
                className="duration-300 data-[active]:animate-in data-[active]:fade-in-0 data-[active]:slide-in-from-bottom-2"
              >
                <QuestionnaireTitle>How deep should the review go?</QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="quick">
                    <span className="font-medium">Quick pass</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="thorough">
                    <span className="font-medium">Thorough review</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireItem
                name="handoff"
                required
                className="duration-300 data-[active]:animate-in data-[active]:fade-in-0 data-[active]:slide-in-from-bottom-2"
              >
                <QuestionnaireTitle>What should the handoff include?</QuestionnaireTitle>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="summary">
                    <span className="font-medium">Short summary</span>
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="detailed">
                    <span className="font-medium">Detailed notes</span>
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
                <QuestionnaireError />
              </QuestionnaireItem>
              <QuestionnaireActions className="justify-end">
                <QuestionnaireNext />
                <QuestionnaireSubmit />
              </QuestionnaireActions>
            </Questionnaire>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Card"
          description="Compose Questionnaire with Card slots while keeping the question title and description semantic."
        >
          <PreviewBox>
            <Card className="w-full max-w-[448px] gap-0 overflow-hidden pt-4">
              <Questionnaire
                className="gap-0"
                items={[
                  {
                    name: "task",
                    required: true,
                    choices: [{ value: "bug" }, { value: "feature" }, { value: "refactor" }]
                  },
                  {
                    name: "priority",
                    required: true,
                    choices: [{ value: "low" }, { value: "high" }]
                  }
                ]}
                onSubmit={(event) => {
                  event.preventDefault()
                }}
              >
                <QuestionnaireItem name="task" required className="gap-4">
                  <CardHeader className="border-b-0 pb-0">
                    <div className="flex w-full items-start gap-1">
                      <div className="min-w-0 flex-1">
                        <QuestionnaireTitle>What should the agent work on?</QuestionnaireTitle>
                        <QuestionnaireDescription>
                          Choose the task that should be handled next.
                        </QuestionnaireDescription>
                      </div>
                      <QuestionnaireProgress className="shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pt-0">
                    <QuestionnaireChoices>
                      <QuestionnaireChoice value="bug">
                        <span className="font-medium">Fix a bug</span>
                      </QuestionnaireChoice>
                      <QuestionnaireChoice value="feature">
                        <span className="font-medium">Build a feature</span>
                      </QuestionnaireChoice>
                      <QuestionnaireChoice value="refactor">
                        <span className="font-medium">Refactor code</span>
                      </QuestionnaireChoice>
                    </QuestionnaireChoices>
                    <QuestionnaireError />
                  </CardContent>
                </QuestionnaireItem>
                <QuestionnaireItem name="priority" required className="gap-4">
                  <CardHeader className="border-b-0 pb-0">
                    <div className="flex w-full items-start gap-1">
                      <div className="min-w-0 flex-1">
                        <QuestionnaireTitle>How urgent is this work?</QuestionnaireTitle>
                      </div>
                      <QuestionnaireProgress className="shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pt-0">
                    <QuestionnaireChoices>
                      <QuestionnaireChoice value="low">
                        <span className="font-medium">Low urgency</span>
                      </QuestionnaireChoice>
                      <QuestionnaireChoice value="high">
                        <span className="font-medium">High urgency</span>
                      </QuestionnaireChoice>
                    </QuestionnaireChoices>
                    <QuestionnaireError />
                  </CardContent>
                </QuestionnaireItem>
                <CardFooter className="border-t bg-muted/50">
                  <QuestionnaireActions className="w-full justify-end">
                    <QuestionnaireNext size="sm" />
                    <QuestionnaireSubmit size="sm" />
                  </QuestionnaireActions>
                </CardFooter>
              </Questionnaire>
            </Card>
          </PreviewBox>
        </ExampleBlock>

        <ExampleBlock
          title="Dialog"
          description="Compose Questionnaire inside a dialog while keeping dismissal host-owned."
        >
          <PreviewBox>
            <Dialog defaultOpen>
              <DialogContent className="max-w-sm gap-0 p-0" showCloseButton={false}>
                <Questionnaire
                  className="gap-0"
                  items={[
                    {
                      name: "scope",
                      required: true,
                      choices: [
                        { value: "component" },
                        { value: "directory" },
                        { value: "workspace" }
                      ]
                    }
                  ]}
                  onSubmit={(event) => {
                event.preventDefault()
              }}
                >
                  <div className="flex flex-col gap-4 p-4">
                    <QuestionnaireItem name="scope" required className="gap-4">
                      <div className="flex items-center justify-between gap-2">
                        <QuestionnaireProgress />
                        <Button variant="ghost" size="icon-sm" aria-label="Close">
                          <X className="size-4" />
                        </Button>
                      </div>
                      <DialogHeader className="gap-2 p-0 text-left">
                        <DialogTitle className="text-base font-medium leading-6">
                          Which files are in scope?
                        </DialogTitle>
                        <QuestionnaireDescription>
                          Choose how broadly the agent can update the workspace.
                        </QuestionnaireDescription>
                      </DialogHeader>
                      <QuestionnaireChoices>
                        <QuestionnaireChoice value="component">
                          <span className="font-medium">Component only</span>
                        </QuestionnaireChoice>
                        <QuestionnaireChoice value="directory" defaultChecked>
                          <span className="font-medium">Complete feature directory</span>
                        </QuestionnaireChoice>
                        <QuestionnaireChoice value="workspace">
                          <span className="font-medium">Any related workspace file</span>
                        </QuestionnaireChoice>
                      </QuestionnaireChoices>
                      <QuestionnaireError />
                    </QuestionnaireItem>
                  </div>
                  <DialogFooter className="border-t bg-muted/50 p-4 sm:justify-between">
                    <QuestionnaireActions className="justify-between">
                      <QuestionnairePrevious variant="outline">
                        Cancel
                      </QuestionnairePrevious>
                      <QuestionnaireNext />
                    </QuestionnaireActions>
                  </DialogFooter>
                </Questionnaire>
              </DialogContent>
            </Dialog>
          </PreviewBox>
        </ExampleBlock>
      </div>
    </div>
  )
}
