import { HTMLProps } from 'react';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';

export const ProfileAddFloatingButton = ({ ...props }: HTMLProps<HTMLButtonElement> & { onClick: () => void }) => {
  return <FloatingButton {...props} text={'후보 추가'} />;
};
