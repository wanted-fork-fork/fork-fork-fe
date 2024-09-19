import { Sheet } from 'react-modal-sheet';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './BottomSheet.module.css';
import { Header } from 'src/shared/ui/layout/Header/Header';

type BottomSheetProps = PropsWithChildren<Parameters<typeof Sheet>[0]>;

export const BottomSheet = ({ children, className = '', ...props }: BottomSheetProps) => {
  return (
    <Sheet {...props} className={`${styles.Sheet} ${className}`}>
      <Sheet.Backdrop onTap={props.onClose} />
      <Sheet.Container className={styles.Container}>{children}</Sheet.Container>
    </Sheet>
  );
};

type BottomSheetHeaderProps = PropsWithChildren<{
  onClose?: () => void;
  onPrev?: () => void;
}>;

const BottomSheetHeader = (props: BottomSheetHeaderProps) => {
  return (
    <Sheet.Header className={styles.Header}>
      <Header {...props} />
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
