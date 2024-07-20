import { Meta, StoryObj } from '@storybook/react';
import { IdealPartnerPage } from 'src/pages/form/ideal_partner/IdealPartnerPage';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

const meta: Meta<typeof IdealPartnerPage> = {
  component: IdealPartnerPage,
};

export default meta;
type Story = StoryObj<typeof IdealPartnerPage>;

export const Default: Story = {
  args: {},
  decorators: [
    (fn) => {
      const store = useIdealPartnerStore((state) => state);
      const firstName = useProfileFirstName();
      return (
        <div style={{ height: 'calc(100vh - 32px)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div style={{ height: '100%', overflow: 'hidden' }}>{fn()}</div>
          <div>
            <span>{firstName}</span>
            <textarea style={{ height: '100%', width: '100%' }} readOnly value={JSON.stringify(store, null, '\t')} />
          </div>
        </div>
      );
    },
  ],
};
