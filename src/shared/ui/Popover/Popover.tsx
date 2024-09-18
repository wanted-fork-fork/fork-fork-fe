import { ReactNode } from 'react';
import * as _Popover from '@radix-ui/react-popover';
import { PopoverContentProps } from '@radix-ui/react-popover';
import styles from './Popover.module.css';

export const Popover = ({
  anchorElement,
  contentElement,
  ...props
}: PopoverContentProps & { anchorElement: ReactNode; contentElement: ReactNode }) => {
  return (
    <_Popover.Root>
      <_Popover.Trigger asChild>
        <_Popover.Anchor>{anchorElement}</_Popover.Anchor>
      </_Popover.Trigger>
      <_Popover.Portal>
        <_Popover.Content className={styles.ContentWrapper} {...props}>
          {contentElement}
        </_Popover.Content>
      </_Popover.Portal>
    </_Popover.Root>
  );
};
