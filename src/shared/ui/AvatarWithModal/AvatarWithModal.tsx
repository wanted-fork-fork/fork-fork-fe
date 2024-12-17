import { Avatar, AvatarProp } from 'src/shared/ui/Avatar/Avatar';

type AvatarWithModalProps = AvatarProp;

export const AvatarWithModal = ({ fallback, shape, size, actionSlot, onClick, ...props }: AvatarWithModalProps) => {
  return (
    <>
      <Avatar fallback={fallback} shape={shape} size={size} actionSlot={actionSlot} {...props} onClick={onClick} />
    </>
  );
};
