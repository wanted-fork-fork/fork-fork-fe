import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import { ProfileCard } from 'src/entities/profile/ui/ProfileCard/ProfileCard';
import styles from './ProfileCardList.module.css';

type Props = {
  profileList: ProfileSummary[];
};

export const ProfileCardList = ({ profileList }: Props) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate.toDateString()}>
          <ProfileCard profile={profile} />
        </li>
      ))}
    </ul>
  );
};
