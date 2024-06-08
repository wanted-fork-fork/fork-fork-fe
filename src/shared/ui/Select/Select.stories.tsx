import { Meta, StoryObj } from '@storybook/react';
import { Select } from 'src/shared/ui/Select/Select';

const meta: Meta<typeof Select> = {
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select required>
      <Select.DefaultItem text={'YYYY'} />
      {Array.from({ length: 50 })
        .map((_, idx) => 1960 + idx)
        .map((v) => (
          <Select.Item key={v} text={v.toString()} value={v} />
        ))}
    </Select>
  ),
  args: {},
};
