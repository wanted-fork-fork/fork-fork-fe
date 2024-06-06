import { Meta, StoryObj } from '@storybook/react';
import { Tab } from 'src/shared/ui/Tab/Tab';

const meta: Meta<typeof Tab> = {
  component: Tab,
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: () => (
    <Tab initialTab={'myProfile'}>
      <Tab.List>
        <Tab.Trigger tabType={'myProfile'} name={'자기 소개'} />
        <Tab.Trigger tabType={'wanted'} name={'이상형 정보'} />
      </Tab.List>
      <Tab.Content tabType={'myProfile'}>자기소개</Tab.Content>
      <Tab.Content tabType={'wanted'}>이상형 정보</Tab.Content>
    </Tab>
  ),
};
