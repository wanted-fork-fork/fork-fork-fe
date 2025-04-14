import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import styles from './ProfileCardGrid.module.css';
import { Link } from '@remix-run/react';
import { ReactElement } from 'react';
import { ProfileSmallCard } from 'src/entities/profile/ui/ProfileSmallCard/ProfileSmallCard';

type Props = {
  profileList: ProfileSummary[];
  profileActionSlot?: (profile: ProfileSummary) => ReactElement;
};

export const ProfileCardGrid = ({ profileList, profileActionSlot }: Props) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={`/profile/${profile.id}`}>
            <ProfileSmallCard profile={profile} topRightSlot={profileActionSlot?.(profile)} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
