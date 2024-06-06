import { Meta, StoryObj } from '@storybook/react';
import { Button } from 'src/shared/ui/Button/Button';
import { ArrowLeft, Check, ChevronRight, Close, List, Plus } from 'src/shared/ui/icons';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    children: '확인',
    size: 'M',
  },
};
export const DisabledButton: Story = {
  args: {
    variant: 'filled',
    disabled: true,
    color: 'primary',
    children: '확인',
    size: 'M',
  },
};
export const OutlinedButton: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    children: '확인',
    size: 'M',
  },
};

export const OutlinePrimaryButtonWithIcon: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    children: '반려동물',
    size: 'M',
    textAlign: 'left',
    suffixSlot: <Check />,
  },
};
export const OutlineNeutralButtonWithIcon: Story = {
  args: {
    variant: 'outline',
    color: 'neutral',
    children: '데이트 스타일',
    size: 'M',
    textAlign: 'left',
    suffixSlot: <Plus />,
  },
};

export const GhostButtonWithIcon: Story = {
  args: {
    variant: 'ghost',
    color: 'neutral',
    children: '이름/성별/나이/키',
    size: 'M',
    textAlign: 'left',
    suffixSlot: <ChevronRight />,
  },
};

export const GhostDisabledButtonWithIcon: Story = {
  args: {
    variant: 'ghost',
    disabled: true,
    color: 'neutral',
    children: '사진',
    size: 'M',
    textAlign: 'left',
    suffixSlot: <ChevronRight />,
  },
};

export const SmallOutlinedButtonWithSuffixIcon: Story = {
  args: {
    variant: 'outline',
    color: 'neutral',
    widthType: 'hug',
    children: '서울시 강남구',
    size: 'S',
    textAlign: 'left',
    suffixSlot: <Close width={16} />,
  },
};
export const SmallOutlinedButtonWithPrefixIcon: Story = {
  args: {
    variant: 'outline',
    color: 'neutral',
    widthType: 'hug',
    children: '직접 추가하기',
    size: 'S',
    textAlign: 'left',
    prefixSlot: <Plus width={16} />,
  },
};
export const SmallOutlinedButton: Story = {
  args: {
    variant: 'outline',
    color: 'neutral',
    children: '🧗 클라이밍',
    widthType: 'hug',
    size: 'S',
    textAlign: 'left',
  },
};
export const SmallOutlinedPrimaryButton: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
    children: '🧗 클라이밍',
    widthType: 'hug',
    size: 'S',
    textAlign: 'left',
  },
};
export const NeutralFilledIconButton: Story = {
  args: {
    variant: 'filled',
    widthType: 'hug',
    color: 'neutral',
    size: 'M',
    prefixSlot: <List />,
  },
};
export const GhostIconButton: Story = {
  args: {
    variant: 'ghost',
    color: 'neutral',
    widthType: 'hug',
    size: 'S',
    prefixSlot: <ArrowLeft />,
  },
};
