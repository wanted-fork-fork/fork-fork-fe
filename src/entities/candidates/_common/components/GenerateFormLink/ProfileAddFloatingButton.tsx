import { HTMLProps } from 'react';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';
import styles from './ProfileAddFloatingButton.module.css';

export const ProfileAddFloatingButton = ({ ...props }: HTMLProps<HTMLButtonElement> & { onClick: () => void }) => {
  return <FloatingButton className={styles.Button} {...props} text={'후보 추가'} size={20} />;
};
