import * as ScrollArea from '@radix-ui/react-scroll-area';
import { PropsWithChildren } from 'react';
import styles from './ScrollView.module.css';

type ScrollViewProps = PropsWithChildren<{
  rootClassName?: string;
}>;

export const ScrollView = ({ rootClassName, children }: ScrollViewProps) => {
  return (
    <ScrollArea.Root className={`${styles.ScrollRoot} ${rootClassName}`}>
      <ScrollArea.Viewport className={styles.ScrollViewport}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation={'vertical'}>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
