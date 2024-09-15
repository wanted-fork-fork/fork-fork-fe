import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import { ProfileCard } from 'src/entities/profile/ui/ProfileCard/ProfileCard';
import styles from './ProfileCardList.module.css';
import { Link } from '@remix-run/react';
import { ReactElement } from 'react';

type Props = {
  profileList: ProfileSummary[];
  profileActionSlot?: ReactElement;
};

export const ProfileCardList = ({ profileList, profileActionSlot }: Props) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={`/profile/${profile.id}`}>
            <ProfileCard profile={profile} headerRightSlot={profileActionSlot} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
