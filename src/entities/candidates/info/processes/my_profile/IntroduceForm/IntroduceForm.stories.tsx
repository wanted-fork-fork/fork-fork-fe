import { Meta, StoryObj } from '@storybook/react';
import { IntroduceForm } from 'src/entities/candidates/info/processes/my_profile/IntroduceForm/IntroduceForm';

const meta: Meta<typeof IntroduceForm> = {
  component: IntroduceForm,
};

export default meta;
type Story = StoryObj<typeof IntroduceForm>;

export const Default: Story = {
  args: {},
  decorators: (fn) => <div style={{ height: '600px' }}>{fn()}</div>,
};
