'use client';
import { container } from './ProfileList.css';
import { Profile, ProfileCard } from '../../../../entities';

type Props = {
  profiles: Profile[];
};

export const ProfileList = ({ profiles }: Props) => {
  return (
    <div className={container}>
      {profiles.map((profile) => (
        <ProfileCard key={profile.name} profile={profile} />
      ))}
    </div>
  );
};
