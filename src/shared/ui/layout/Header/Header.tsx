import { Button } from 'src/shared/ui/Button/Button';
import { ArrowLeft, Close } from 'src/shared/ui/icons';
import styles from './Header.module.css';
import { PropsWithChildren, ReactNode } from 'react';
import { Theme } from 'src/shared/styles/constants';

export const Header = ({
  suffixSlot,
  prefixSlot,
  onPrev,
  onClose,
  children,
  className = '',
}: PropsWithChildren<{
  suffixSlot?: ReactNode;
  prefixSlot?: ReactNode;
  onClose?: () => void;
  onPrev?: () => void;
  className?: string;
}>) => {
  return (
    <div className={`${styles.Header} ${className}`}>
      {onPrev && (
        <Button variant={'ghost'} color={'neutral'} widthType={'hug'} size={'fit'} onClick={onPrev}>
          <ArrowLeft width={24} color={Theme.color.neutral50} />
        </Button>
      )}
      {prefixSlot && <span className={styles.Prefix}>{prefixSlot}</span>}
      {children}
      {suffixSlot && <span className={styles.Suffix}>{suffixSlot}</span>}
      {onClose && (
        <Button
          className={styles.CloseButton}
          variant={'ghost'}
          color={'neutral'}
          widthType={'hug'}
          size={'fit'}
          onClick={onClose}
        >
          <Close width={24} color={Theme.color.neutral50} />
        </Button>
      )}
    </div>
  );
};
