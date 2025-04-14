import { Meta, StoryObj } from '@storybook/react';
import { SignUpCompletePage } from 'src/processes/signup/SignUpCompletePage/SignUpCompletePage';

const meta: Meta<typeof SignUpCompletePage> = {
  component: SignUpCompletePage,
};

export default meta;
type Story = StoryObj<typeof SignUpCompletePage>;

export const Default: Story = {
  args: {},
};
