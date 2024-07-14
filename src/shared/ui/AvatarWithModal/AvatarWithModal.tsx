import { Avatar, AvatarProp } from 'src/shared/ui/Avatar/Avatar';
import { useState } from 'react';
import { ImageModal } from 'src/shared/ui/ImageModal/ImageModal';

type AvatarWithModalProps = AvatarProp;

export const AvatarWithModal = ({ fallback, shape, size, actionSlot, onClick, ...props }: AvatarWithModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleClickAvatar = () => {
    onClick?.();
    setShowModal(true);
  };

  return (
    <>
      <Avatar
        fallback={fallback}
        shape={shape}
        size={size}
        actionSlot={actionSlot}
        {...props}
        onClick={handleClickAvatar}
      />
      <ImageModal showModal={showModal} closeModal={() => setShowModal(false)} {...props} />
    </>
  );
};
