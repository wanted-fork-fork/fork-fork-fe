import { Profile, ProfileCard } from '@repo/entities-profile';
import { ShareProfileIconButton } from '@repo/features-share-profile';
import { container } from './ProfileList.css';

type Props = {
  profiles: Profile[];
};

export const ProfileList = ({ profiles }: Props) => {
  return (
    <div className={container}>
      {profiles.map((profile) => (
        <ProfileCard key={profile.name} profile={profile} headerRightSlot={<ShareProfileIconButton profile={profile} />} />
      ))}
    </div>
  );
};
