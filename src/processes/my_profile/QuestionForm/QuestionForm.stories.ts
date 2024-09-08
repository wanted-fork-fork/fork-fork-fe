import { Meta, StoryObj } from '@storybook/react';
import { QuestionForm } from 'src/processes/my_profile/QuestionForm/QuestionForm';

const meta: Meta<typeof QuestionForm> = {
  component: QuestionForm,
};

export default meta;
type Story = StoryObj<typeof QuestionForm>;

export const Default: Story = {
  args: {},
};
