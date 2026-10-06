import type { Meta, StoryObj } from "@storybook/react-vite"

import { QuestionnaireDesignSpec } from "./questionnaire-design-spec"
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

const meta: Meta<typeof Questionnaire> = {
  title: "Atoms/Questionnaire",
  component: Questionnaire,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Questionnaire>

const contextChoiceLabels = {
  files: "Relevant source files",
  tests: "Existing tests",
  docs: "Architecture documentation",
  history: "Recent commit history"
} as const

const contextItems = [
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
] as const

export const DesignSpec: Story = {
  render: () => <QuestionnaireDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true }
  }
}

export const MultipleSelection: Story = {
  render: () => (
    <Questionnaire
      className="w-[446px]"
      items={contextItems}
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
          {contextItems[0].choices.map((choice) => (
            <QuestionnaireChoice key={choice.value} value={choice.value}>
              <span className="font-medium">{contextChoiceLabels[choice.value]}</span>
            </QuestionnaireChoice>
          ))}
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions className="justify-end">
        <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}

export const WithFreeformInput: Story = {
  render: () => (
    <Questionnaire
      className="w-[446px]"
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
  )
}

export const MultiStep: Story = {
  render: () => (
    <Questionnaire
      className="w-[446px]"
      items={[
        {
          name: "category",
          required: true,
          choices: [
            { value: "feature" },
            { value: "fix" },
            { value: "refactor" }
          ]
        },
        {
          name: "verify",
          required: true,
          choices: [
            { value: "unit" },
            { value: "e2e" },
            { value: "manual" }
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
      <QuestionnaireItem name="verify" required>
        <QuestionnaireTitle>How should the migration be verified?</QuestionnaireTitle>
        <QuestionnaireDescription>
          These checks were selected during the previous session.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="unit">
            <span className="font-medium">Unit tests</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="e2e">
            <span className="font-medium">End-to-end tests</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="manual">
            <span className="font-medium">Manual QA</span>
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
  )
}
