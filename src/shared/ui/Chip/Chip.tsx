import { Button } from 'src/shared/ui/Button/Button';
import { PropsWithChildren } from 'react';
import styles from './Chip.module.css';

type ChipProps = PropsWithChildren<{
  selected?: boolean;
  onClick?: () => void;
}>;

export const Chip = ({ selected, onClick, children }: ChipProps) => {
  return (
    <Button
      className={styles.Chip}
      variant={'outline'}
      widthType={'hug'}
      size={'S'}
      color={selected ? 'primary' : 'neutral'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
