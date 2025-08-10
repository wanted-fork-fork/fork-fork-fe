import { HTMLProps } from 'react';
import { Plus } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import styles from './FloatingButton.module.css';

export const FloatingButton = ({
  className = '',
  onClick,
  text,
  size = 24,
  ...props
}: HTMLProps<HTMLButtonElement> & { onClick: () => void; text?: string; size?: number }) => {
  return (
    <button
      className={`${className} ${styles.FloatingButton}`}
      onClick={onClick}
      {...props}
      type={'button'}
      data-shape={text ? 'rounded' : 'circle'}
    >
      <Plus color={Theme.color.neutral0} width={size} />
      {Boolean(text) && <span>{text}</span>}
    </button>
  );
};
