import { Avatar } from 'src/shared/ui/Avatar/Avatar';

export const UserAvatar = ({ imageSrc, size }: { imageSrc?: string; size: number }) => {
  const profileImage = !imageSrc || imageSrc.includes('default_profile') ? 'images/default_profile.png' : imageSrc;

  return <Avatar fallback={''} shape={'circle'} size={size} src={profileImage} />;
};
