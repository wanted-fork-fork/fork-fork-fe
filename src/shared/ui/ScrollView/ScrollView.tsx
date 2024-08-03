import * as ScrollArea from '@radix-ui/react-scroll-area';
import { PropsWithChildren } from 'react';
import styles from './ScrollView.module.css';

type ScrollViewProps = PropsWithChildren<{
  rootClassName?: string;
  viewportClassName?: string;
}>;

export const ScrollView = ({ rootClassName = '', viewportClassName = '', children }: ScrollViewProps) => {
  return (
    <ScrollArea.Root className={`${styles.ScrollRoot} ${rootClassName}`}>
      <ScrollArea.Viewport className={`${styles.ScrollViewport} ${viewportClassName}`}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar} orientation={'vertical'}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

ScrollView.Root = function ScrollViewRoot({ className = '', children }: PropsWithChildren<{ className?: string }>) {
  return (
    <ScrollArea.Root className={`${styles.ScrollRoot} ${className}`}>
      {children}
      <ScrollArea.Scrollbar className={styles.Scrollbar} orientation={'vertical'}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

ScrollView.Viewport = function ScrollViewViewport({
  className = '',
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <ScrollArea.Viewport className={`${styles.ScrollViewport} ${className}`}>{children}</ScrollArea.Viewport>;
};
