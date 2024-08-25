import { Sheet } from 'react-modal-sheet';
import { PropsWithChildren, ReactNode } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { ArrowLeft, Close } from 'src/shared/ui/icons';
import styles from './BottomSheet.module.css';

type BottomSheetProps = PropsWithChildren<Parameters<typeof Sheet>[0]>;

export const BottomSheet = ({ children, ...props }: BottomSheetProps) => {
  return (
    <Sheet {...props}>
      <Sheet.Backdrop onTap={props.onClose} />
      <Sheet.Container className={styles.Container}>{children}</Sheet.Container>
    </Sheet>
  );
};

type BottomSheetHeaderProps = PropsWithChildren<{
  onClose?: () => void;
  onPrev?: () => void;
}>;

const BottomSheetHeader = ({ onPrev, onClose, children }: BottomSheetHeaderProps) => {
  return (
    <Sheet.Header className={styles.Header}>
      {onPrev && (
        <Button variant={'ghost'} color={'neutral'} widthType={'hug'} size={'fit'} onClick={onPrev}>
          <ArrowLeft width={24} />
        </Button>
      )}
      {children}
      {onClose && (
        <Button
          className={styles.CloseButton}
          variant={'ghost'}
          color={'neutral'}
          widthType={'hug'}
          size={'fit'}
          onClick={onClose}
        >
          <Close width={24} />
        </Button>
      )}
    </Sheet.Header>
  );
};

type BottomSheetContentProps = PropsWithChildren<{
  className?: string;
  footerSlot?: ReactNode;
}>;

const BottomSheetContent = ({ className = '', footerSlot, children }: BottomSheetContentProps) => {
  return (
    <Sheet.Content className={`${styles.Content} ${className}`}>
      {children}
      {footerSlot && <div className={styles.Footer}>{footerSlot}</div>}
    </Sheet.Content>
  );
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
