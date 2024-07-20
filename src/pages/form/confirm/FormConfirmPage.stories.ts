import { Meta, StoryObj } from '@storybook/react';
import { FormConfirmPage } from 'src/pages/form/confirm/FormConfirmPage';

const meta: Meta<typeof FormConfirmPage> = {
  component: FormConfirmPage,
};

export default meta;
type Story = StoryObj<typeof FormConfirmPage>;

export const Default: Story = {
  args: {},
};
