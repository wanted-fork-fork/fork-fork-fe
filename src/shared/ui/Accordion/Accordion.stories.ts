import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from 'src/shared/ui/Accordion/Accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    summary: '기본 개인정보',
    children: 'fdsafdsafdsafdsafdsafdsad',
  },
};
