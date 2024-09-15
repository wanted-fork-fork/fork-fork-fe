import styles from './IconBoxButton.module.css';
import { CSSProperties, ReactNode, useRef } from 'react';
import { Theme } from '../../styles/constants';

export const IconBoxButton = ({
  icon,
  iconBackgroundColor = Theme.color.neutral90,
  text,
  onClick,
}: {
  icon: ReactNode;
  iconBackgroundColor?: string;
  text: string;
  onClick: () => void;
}) => {
  const iconWrapperStyleRef = useRef<CSSProperties>({
    backgroundColor: iconBackgroundColor,
  });
  return (
    <button className={styles.Button} onClick={onClick}>
      <div className={styles.ButtonIconWrapper} style={iconWrapperStyleRef.current}>
        {icon}
      </div>
      {text}
    </button>
  );
};
