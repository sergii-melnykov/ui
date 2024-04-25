import { RHFTextField, FormProvider } from "../../src/hook-form";
import type { Meta as MetaType, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";

const Meta: MetaType<typeof RHFTextField> = {
  component: RHFTextField,
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
type Story = StoryObj<typeof RHFTextField>;

export const Primary: Story = {
  args: {
    name: "name",
    label: "RHFTextField",
    color: "primary",
  },
};
