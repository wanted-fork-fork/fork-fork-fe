import { Meta, StoryObj } from '@storybook/react';
import { ToMatcherForm } from 'src/processes/ideal_partner/ToMatcherForm/ToMatcherForm';

const meta: Meta<typeof ToMatcherForm> = {
  component: ToMatcherForm,
};

export default meta;
type Story = StoryObj<typeof ToMatcherForm>;

export const Default: Story = {
  args: {},
  decorators: (fn) => (
    <div
      style={{
        height: '500px',
      }}
    >
      {fn()}
    </div>
  ),
};
