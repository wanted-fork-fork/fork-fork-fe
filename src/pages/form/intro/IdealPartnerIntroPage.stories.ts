import { Meta, StoryObj } from '@storybook/react';
import { IdealPartnerIntroPage } from 'src/pages/form/intro/IdealPartnerIntroPage';

const meta: Meta<typeof IdealPartnerIntroPage> = {
  component: IdealPartnerIntroPage,
};

export default meta;
type Story = StoryObj<typeof IdealPartnerIntroPage>;

export const Default: Story = {
  args: {},
};
