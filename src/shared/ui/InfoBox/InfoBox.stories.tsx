import { Meta, StoryObj } from '@storybook/react';
import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';

const meta: Meta<typeof InfoBox> = {
  component: InfoBox,
};

export default meta;
type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {
  render: (args) => (
    <InfoBox {...args}>
      <h3>사진 업로드 TIP!</h3>
      <ul style={{ fontSize: '12px' }}>
        <li>옷 스타일을 참고할 수 있는 전신사진</li>
        <li>정면 사진 (잘나온 증명사진, 배경이 깔끔한 사진 등)</li>
      </ul>
    </InfoBox>
  ),
  args: {
    radiusSize: 'L',
  },
};
