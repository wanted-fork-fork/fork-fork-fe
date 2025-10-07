import { Meta, StoryObj } from '@storybook/react';

import { AvatarWithComment } from './AvatarWithComment';
import { Theme } from 'src/shared/styles/constants';

const meta: Meta<typeof AvatarWithComment> = {
  component: AvatarWithComment,
};

export default meta;
type Story = StoryObj<typeof AvatarWithComment>;

export const Primary: Story = {
  args: {
    creatorImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
    creatorName: 'Haerin',
    comment: 'Hello, world!',
  },
  render: (args) => (
    <div style={{width: '300px', backgroundColor: Theme.color.neutral10}}>
      <AvatarWithComment {...args} />
    </div>
  ),
};