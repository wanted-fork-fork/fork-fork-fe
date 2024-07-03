import { Meta, StoryObj } from '@storybook/react';
import { IdealPartnerPage } from 'src/pages/form/ideal_partner/IdealPartnerPage';

const meta: Meta<typeof IdealPartnerPage> = {
  component: IdealPartnerPage,
};

export default meta;
type Story = StoryObj<typeof IdealPartnerPage>;

export const Default: Story = {
  args: {},
  decorators: (fn) => <div style={{ height: '100vh' }}>{fn()}</div>,
};
