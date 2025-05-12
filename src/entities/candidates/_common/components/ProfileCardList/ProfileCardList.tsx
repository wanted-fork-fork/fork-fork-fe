import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import { ProfileCard } from 'src/entities/candidates/info/components/ProfileCard/ProfileCard';
import styles from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList.module.css';
import { Link } from '@remix-run/react';
import { ReactElement } from 'react';

type Props = {
  profileList: ProfileSummary[];
  profileActionSlot?: (profile: ProfileSummary) => ReactElement;
};

export const ProfileCardList = ({ profileList, profileActionSlot }: Props) => {
  return (
    <ul className={styles.Container}>
      {profileList.map((profile) => (
        <li key={profile.name + profile.birthDate}>
          <Link to={`/profile/${profile.id}`}>
            <ProfileCard profile={profile} headerRightSlot={profileActionSlot?.(profile)} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
