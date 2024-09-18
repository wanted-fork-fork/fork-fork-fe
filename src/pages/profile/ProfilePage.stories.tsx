import { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from 'src/pages/profile/ProfilePage';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { fullProfileMock } from 'src/entities/profile/api/__mock__/fullProfile.mock';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { MockIdealPartner } from 'src/entities/ideal_partner/api/__mock__/idealPartner.mock';

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
