import { Meta, StoryObj } from '@storybook/react';
import { SelectCandidateCard } from 'src/entities/candidates/_common/components/SelectCandidateCard/SelectCandidateCard';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';
import { Input } from 'src/shared/ui/Input/Input';

const meta: Meta<typeof SelectCandidateCard> = {
  component: SelectCandidateCard,
};

export default meta;
type Story = StoryObj<typeof SelectCandidateCard>;

export const Default: Story = {
  args: {
    profile: profileMock,
    selected: false,
    onClick: () => {},
    disabled: false,
    footer: <Input />,
  },
};
