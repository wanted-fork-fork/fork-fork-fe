import styles from '../../../../../shared/ui/Profile/Profile.module.css';
import { ProfileCellHeader } from '../../../../../shared/ui/Profile/ProfileCellHeader';
import { getReligionText } from '../../../lib/getReligionText';
import { AvatarList } from '../../../../../shared/ui/AvatarList/AvatarList';
import { getJobText } from '../../../lib/getJobText';
import { getLocationText } from '../../../lib/getLocationText';
import { calculateAge, convertDateObjectToDate } from '../../../../../shared/vo/date';
import { useTranslation } from 'react-i18next';
import { MyProfile, useMyProfileImages } from '../../../model/myProfileStore';
import { EditProfileFunction } from 'src/features/EditInfo/ProfileEditContext';

export const PersonalInfoGrid = ({
  profile,
  onClickEdit,
}: {
  profile: MyProfile;
  onClickEdit?: EditProfileFunction;
}) => {
  const { t } = useTranslation();
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));
  const dtoList = useMyProfileImages();

  const showBlankValue = onClickEdit;

  return (
    <div className={styles.Grid}>
      {(showBlankValue || profile.name || profile.gender) && (
        <div className={styles.GridRow}>
          {(showBlankValue || profile.name) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'이름'} onClickEdit={() => onClickEdit?.('PROFILE_PERSONAL_INFO')} />
              <span>{profile.name}</span>
            </div>
          )}
          {(showBlankValue || profile.gender) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'성별'} onClickEdit={() => onClickEdit?.('PROFILE_PERSONAL_INFO')} />
              <span>{t(profile.gender)}</span>
            </div>
          )}
        </div>
      )}
      {(showBlankValue || profile.birthDate || profile.height > 0) && (
        <div className={styles.GridRow}>
          {(showBlankValue || profile.birthDate) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'나이'} onClickEdit={() => onClickEdit?.('PROFILE_PERSONAL_INFO')} />
              <span>
                {age}세 ({profile.birthDate.year}년 {profile.birthDate.month}월)
              </span>
            </div>
          )}
          {(showBlankValue || profile.height > 0) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'키(신장)'} onClickEdit={() => onClickEdit?.('PROFILE_PERSONAL_INFO')} />
              <span>{profile.height}cm</span>
            </div>
          )}
        </div>
      )}
      {(showBlankValue || profile) && (
        <div className={styles.GridRow}>
          {(showBlankValue || profile.mbti) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'MBTI'} onClickEdit={() => onClickEdit?.('PROFILE_MBTI')} />
              <span>{profile.mbti}</span>
            </div>
          )}
          {(showBlankValue || profile.religion) && (
            <div className={styles.Cell}>
              <ProfileCellHeader title={'종교'} onClickEdit={() => onClickEdit?.('PROFILE_RELIGION')} />
              <span>{getReligionText(profile.religion, t)}</span>
            </div>
          )}
        </div>
      )}
      {(showBlankValue || profile.imageDtoList.length > 0) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'업로드 사진'} onClickEdit={() => onClickEdit?.('PROFILE_MY_IMAGE')} />
            <div className={styles.HorizontalList}>
              <AvatarList imageDtoList={dtoList} />
            </div>
          </div>
        </div>
      )}
      {(showBlankValue || profile.job) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'신분'} onClickEdit={() => onClickEdit?.('PROFILE_JOB')} />
            <span>{getJobText(profile.job, t)}</span>
          </div>
        </div>
      )}
      {(showBlankValue || profile.location.length > 0) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'주로 머무는 지역'} onClickEdit={() => onClickEdit?.('PROFILE_LOCATION')} />
            <span>{profile.location.map((l) => getLocationText(l, t)).join(', ')}</span>
          </div>
        </div>
      )}
    </div>
  );
};
