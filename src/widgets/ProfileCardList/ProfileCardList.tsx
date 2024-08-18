import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import { ProfileCard } from 'src/entities/profile/ui/ProfileCard/ProfileCard';
import styles from './ProfileCardList.module.css';
import { Link } from '@remix-run/react';

type Props = {
  profileList: ProfileSummary[];
};

export const ProfileCardList = ({ profileList }: Props) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={`/profile/${profile.id}`}>
            <ProfileCard profile={profile} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
