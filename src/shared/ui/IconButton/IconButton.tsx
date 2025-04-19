import { PropsWithChildren } from 'react';
import { Button } from 'src/shared/ui/Button/Button';

export const IconButton = ({
  className = '',
  children,
  onClick,
}: PropsWithChildren<{ onClick?: () => void; className?: string }>) => (
  <Button className={className} variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'} onClick={onClick}>
    {children}
  </Button>
);
