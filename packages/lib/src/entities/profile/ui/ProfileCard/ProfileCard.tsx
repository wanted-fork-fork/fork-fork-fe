import { ReactElement } from 'react';
import { calculateAge } from 'shared/utils';
import { Profile } from '../../model';
import {
  container,
  detailSection,
  detailTable,
  headerRightSection,
  headerSection,
  info,
  profileImage,
  profileImageContainer,
  profileName,
  summaryContainer,
} from './ProfileCard.css';

type Props = {
  profile: Profile;
  headerRightSlot?: ReactElement;
};

export const ProfileCard = ({ profile, headerRightSlot }: Props) => {
  return (
    <div className={container}>
      <div className={headerSection}>
        <div className={profileImageContainer}>
          <img className={profileImage} src={profile.imageSrcList[0]} alt={`${profile.name} 프로필 사진`} />
        </div>
        <div className={summaryContainer}>
          <strong className={profileName}>{profile.name}</strong>
          <div>
            <span className={info}>{calculateAge(profile.birthDate)}세</span>
            <span className={info}>{profile.gender === 'FEMALE' ? '여자' : '남자'}</span>
            <span className={info}>서울</span>
          </div>
        </div>
        {headerRightSlot && <div className={headerRightSection}>{headerRightSlot}</div>}
      </div>
      <div className={detailSection}>
        <table className={detailTable}>
          <tbody>
            <tr>
              <th scope={'row'}>MBTI</th>
              <td>INFP</td>
              <th scope={'row'}>신장</th>
              <td>165cm</td>
            </tr>
            <tr>
              <th scope={'row'}>음주</th>
              <td>주 1-2회</td>
              <th scope={'row'}>흡연</th>
              <td>안합니다</td>
            </tr>
            <tr>
              <th scope={'row'}>종교</th>
              <td>무교</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
