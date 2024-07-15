import { Meta, StoryObj } from '@storybook/react';
import { IdealPartnerProfile } from 'src/entities/ideal_partner/ui/IdealPartnerProfile/IdealPartnerProfile';
import { MockIdealPartner } from 'src/entities/ideal_partner/api/__mock__/idealPartner.mock';

const meta: Meta<typeof IdealPartnerProfile> = {
  component: IdealPartnerProfile,
};

export default meta;
type Story = StoryObj<typeof IdealPartnerProfile>;

export const Default: Story = {
  args: {
    profile: MockIdealPartner,
  },
};
