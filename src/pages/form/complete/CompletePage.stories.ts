import { Meta, StoryObj } from '@storybook/react';
import { CompletePage } from 'src/pages/form/complete/CompletePage';

const meta: Meta<typeof CompletePage> = {
  component: CompletePage,
};

export default meta;
type Story = StoryObj<typeof CompletePage>;

export const Default: Story = {
  args: {},
};
