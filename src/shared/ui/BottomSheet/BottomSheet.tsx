import { Sheet } from 'react-modal-sheet';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './BottomSheet.module.css';
import { Header, HeaderProps } from 'src/shared/ui/layout/Header/Header';

type BottomSheetProps = PropsWithChildren<Parameters<typeof Sheet>[0]>;

export const BottomSheet = ({ children, className = '', ...props }: BottomSheetProps) => {
  return (
    <Sheet {...props} disableScrollLocking={true} className={`${styles.Sheet} ${className}`}>
      <Sheet.Backdrop onTap={props.onClose} />
      <Sheet.Container className={styles.Container}>{children}</Sheet.Container>
    </Sheet>
  );
};

type BottomSheetHeaderProps = PropsWithChildren<
  {
    className?: string;
    onClose?: () => void;
    onPrev?: () => void;
  } & HeaderProps
>;

const BottomSheetHeader = ({ className = '', ...props }: BottomSheetHeaderProps) => {
  return (
    <Sheet.Header className={`${className} ${styles.Header}`}>
      <Header {...props} className={styles.InnerHeader} />
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
