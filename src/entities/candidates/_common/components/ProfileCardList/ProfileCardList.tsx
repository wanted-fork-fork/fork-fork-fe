import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import styles from 'src/entities/candidates/_common/components/ProfileCardList/ProfileCardList.module.css';
import { Link } from '@remix-run/react';
import { ReactElement } from 'react';
import { ProfileCardV2 } from 'src/entities/candidates/info/components/ProfileCardV2/ProfileCardV2';

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
            <ProfileCardV2 profile={profile} headerRightSlot={profileActionSlot?.(profile)} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
