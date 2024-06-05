import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import { ProfileCard } from 'src/entities/profile/ui/ProfileCard/ProfileCard';
import styles from './ProfileCardList.module.css';

type Props = {
  profileList: ProfileSummary[];
};

export const ProfileCardList = ({ profileList }: Props) => {
  return (
    <div className={styles.Container}>
      {profileList.map((profile) => (
        <ProfileCard key={profile.name + profile.birthDate.toDateString()} profile={profile} />
      ))}
    </div>
  );
};
