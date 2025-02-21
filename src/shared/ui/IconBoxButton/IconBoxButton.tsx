import styles from './IconBoxButton.module.css';
import { ReactNode } from 'react';
import { Theme } from '../../styles/constants';

export const IconBoxButton = ({
  icon,
  iconBackgroundColor = Theme.color.neutral90,
  text,
  onClick,
  disabled = false,
}: {
  icon: ReactNode;
  iconBackgroundColor?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button className={styles.Button} onClick={onClick} disabled={disabled}>
      <div className={styles.ButtonIconWrapper} style={{ backgroundColor: iconBackgroundColor }}>
        {icon}
      </div>
      {text}
    </button>
  );
};
