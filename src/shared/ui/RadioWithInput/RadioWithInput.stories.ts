import { Meta, StoryObj } from '@storybook/react';
import { RadioWithInput } from 'src/shared/ui/RadioWithInput/RadioWithInput';

const meta: Meta<typeof RadioWithInput> = {
  component: RadioWithInput,
};

export default meta;
type Story = StoryObj<typeof RadioWithInput>;

export const Default: Story = {
  args: { label: '직장인', checked: true, inputPlaceholder: '직장을 입력해주세요' },
};
