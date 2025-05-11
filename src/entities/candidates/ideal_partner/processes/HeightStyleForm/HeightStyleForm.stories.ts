import { Meta, StoryObj } from '@storybook/react';
import { HeightStyleForm } from 'src/entities/candidates/ideal_partner/processes/HeightStyleForm/HeightStyleForm';

const meta: Meta<typeof HeightStyleForm> = {
  component: HeightStyleForm,
};

export default meta;
type Story = StoryObj<typeof HeightStyleForm>;

export const Default: Story = {
  args: {},
};
