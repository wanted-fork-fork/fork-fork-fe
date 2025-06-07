import { Button } from 'src/shared/ui/Button/Button';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './Chip.module.css';

type ChipProps = PropsWithChildren<{
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  suffixSlot?: ReactNode;
}>;

export const Chip = ({ className = '', selected, onClick, suffixSlot, children }: ChipProps) => {
  return onClick ? (
    <Button
      type={'button'}
      className={`${className} ${styles.Chip}`}
      variant={'outline'}
      widthType={'hug'}
      size={'S'}
      color={selected ? 'primary' : 'neutral'}
      onClick={onClick}
      suffixSlot={suffixSlot}
    >
      {children}
    </Button>
  ) : (
    <div className={`${className} ${styles.Chip} ${styles.NonButtonChip}`}>{children}</div>
  );
};
