import { Meta, StoryObj } from '@storybook/react';
import { AddCandidatePage } from 'src/pages/groups/add_candidate/AddCandidatePage';
import { profileMock } from 'src/entities/candidates/info/mocks/profile.mock';

const meta: Meta<typeof AddCandidatePage> = {
  component: AddCandidatePage,
};

export default meta;
type Story = StoryObj<typeof AddCandidatePage>;

export const Default: Story = {
  args: {
    groupId: 1,
    candidates: Array.from({ length: 10 }).map((_, idx) => ({
      profile: { ...profileMock, id: idx.toString() },
      isAdded: idx % 4 === 0,
    })),
  },
};
