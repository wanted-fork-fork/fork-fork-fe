import { Meta, StoryObj } from '@storybook/react';
import { IdealPartnerProfile } from 'src/entities/candidates/ideal_partner/components/IdealPartnerProfile/IdealPartnerProfile';
import { MockIdealPartner } from 'src/entities/candidates/ideal_partner/mocks/idealPartner.mock';

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
