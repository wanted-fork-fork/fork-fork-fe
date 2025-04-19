import { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { MyProfileProvider } from 'src/domains/candidates/info/entities/models/myProfileStore';
import { fullProfileMock } from 'src/domains/candidates/info/entities/mocks/fullProfile.mock';
import { IdealPartnerProvider } from 'src/domains/candidates/ideal_partner/entities/models/idealPartnerStore';
import { MockIdealPartner } from 'src/domains/candidates/ideal_partner/entities/mocks/idealPartner.mock';

const meta: Meta<typeof ProfilePage> = {
  component: ProfilePage,
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  args: {
    infoId: '123',
  },
  decorators: [
    (fn) => (
      <MyProfileProvider initialState={fullProfileMock}>
        <IdealPartnerProvider initialState={MockIdealPartner}>{fn()}</IdealPartnerProvider>
      </MyProfileProvider>
    ),
  ],
};
