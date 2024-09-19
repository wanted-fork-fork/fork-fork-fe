import { Meta, StoryObj } from '@storybook/react';
import { UploadLoadingPage } from 'src/pages/form/complete/UploadLoadingPage';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { fullProfileMock } from 'src/entities/profile/api/__mock__/fullProfile.mock';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { MockIdealPartner } from 'src/entities/ideal_partner/api/__mock__/idealPartner.mock';

const meta: Meta<typeof UploadLoadingPage> = {
  component: UploadLoadingPage,
};

export default meta;
type Story = StoryObj<typeof UploadLoadingPage>;

export const Default: Story = {
  args: {},
  decorators: [
    (fn) => <MyProfileProvider initialState={fullProfileMock}>{fn()}</MyProfileProvider>,
    (fn) => <IdealPartnerProvider initialState={MockIdealPartner}>{fn()}</IdealPartnerProvider>,
  ],
};
