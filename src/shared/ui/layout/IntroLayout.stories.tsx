import { Meta, StoryObj } from '@storybook/react';
import { IntroLayout } from 'src/shared/ui/layout/IntroLayout';
import { Button } from 'src/shared/ui/Button/Button';

const meta: Meta<typeof IntroLayout> = {
  component: IntroLayout,
};

export default meta;
type Story = StoryObj<typeof IntroLayout>;

export const Default: Story = {
  args: {
    title: (
      <>
        후보자 공유 그룹에 참여하여 <br />
        함께 좋은 인연 만들어가요.
      </>
    ),
    description: (
      <>
        관리자: 강혜원 <br />
        그룹명: 유부 프로젝트
      </>
    ),
    imgUrl: '/images/join.png',
    imgAlt: '이미지',
    footer: <Button widthType={'fill'}>그룹 참여 신청</Button>,
  },
};
