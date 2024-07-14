import { Meta, StoryObj } from '@storybook/react';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { useState } from 'react';

const meta: Meta<typeof AvatarList> = {
  component: AvatarList,
};

export default meta;
type Story = StoryObj<typeof AvatarList>;

function AvatarListStory() {
  const [files, setFiles] = useState<File[]>([]);
  return <AvatarList files={files} setFiles={setFiles} />;
}

export const Default: Story = {
  render: AvatarListStory,
};
