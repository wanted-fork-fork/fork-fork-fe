import { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { MyProfileProvider } from 'src/entities/candidates/info/models/myProfileStore';
import { fullProfileMock } from 'src/entities/candidates/info/mocks/fullProfile.mock';
import { IdealPartnerProvider } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { MockIdealPartner } from 'src/entities/candidates/ideal_partner/mocks/idealPartner.mock';

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
