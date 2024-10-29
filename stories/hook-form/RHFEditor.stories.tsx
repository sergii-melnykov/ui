import { RHFEditor, FormProvider } from "../../src/hook-form";
import type { Meta as MetaType, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";

const Meta: MetaType<typeof RHFEditor> = {
  component: RHFEditor,
  decorators: [
    (Story) => {
      const methods = useForm();
      return (
        <FormProvider methods={methods}>
          <Story />
        </FormProvider>
      );
    },
  ],
};

export default Meta;
type Story = StoryObj<typeof RHFEditor>;

export const Basic: Story = {
  args: {
    name: "name",
    label: "RHFEditor",
  },
};
