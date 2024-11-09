import { PropsWithChildren } from 'react';
import { Button } from 'src/shared/ui/Button/Button';

export const IconButton = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => (
  <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'} onClick={onClick}>
    {children}
  </Button>
);
