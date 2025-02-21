import { IdealPartner, useIdealPartnerImages } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { getSmokingText } from '../../../profile/lib/getSmokingText';
import { getDrinkingText } from '../../../profile/lib/getDrinkingText';
import { getReligionText } from '../../../profile/lib/getReligionText';
import { useProfileEditContext } from 'src/features/EditInfo/ProfileEditContext';
import { useTranslation } from 'react-i18next';

const ImportantBadge = () => <span className={styles.RequiredBadge}>중요</span>;

export const IdealPartnerProfile = ({ profile }: { profile: IdealPartner }) => {
  const { t } = useTranslation();

  const value = useProfileEditContext();
  const onClickEdit = value.canEdit ? value.onEdit : undefined;

  const imageDtoList = useIdealPartnerImages();

  const showBlankValue = value.canEdit;

  const renderBadge = (key: string) => (profile.requiredOptions.includes(key) ? <ImportantBadge /> : <></>);

  return (
    <section className={styles.Grid}>
      {(showBlankValue || profile.ageRange || profile.heightRange) && (
        <div className={styles.GridRow}>
          {(showBlankValue || profile.ageRange) && (
            <div className={styles.Cell}>
              <ProfileCellHeader
                title={'선호하는 연령대'}
                onClickEdit={() => onClickEdit?.('IDEAL_AGE')}
                suffix={renderBadge('나이')}
              />
              <span>
                {profile.ageRange ? `${profile.ageRange?.min}-${profile.ageRange?.max}` : '나이는 딱히 상관 없어요'}
              </span>
            </div>
          )}
          <div className={styles.Cell}>
            <ProfileCellHeader
              title={'선호하는 키'}
              onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')}
              suffix={renderBadge('키 + 선호하는 스타일')}
            />
            <span>
              {profile.heightRange ? `${profile.heightRange?.min}cm - ${profile.heightRange?.max}cm` : '상관 없어요'}
            </span>
          </div>
        </div>
      )}
      {(showBlankValue || profile.style) && (
        <div className={styles.Cell}>
          <ProfileCellHeader
            title={'선호하는 스타일'}
            onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')}
            suffix={renderBadge('키 + 선호하는 스타일')}
          />
          <span>{profile.style}</span>
        </div>
      )}
      {(showBlankValue || profile.imageDtoList.length > 0) && (
        <div className={styles.Cell}>
          <ProfileCellHeader title={'이상형 참고 사진'} onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')} />
          <span>
            <AvatarList imageDtoList={imageDtoList} />
          </span>
        </div>
      )}
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'희망 지역'}
          onClickEdit={() => onClickEdit?.('IDEAL_LOCATION')}
          suffix={renderBadge('지역')}
        />
        <span>{t(`LOCATION_${profile.locations}`)}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'취미'}
          onClickEdit={() => onClickEdit?.('IDEAL_HOBBY')}
          suffix={renderBadge('취미')}
        />
        <span>{t(`HOBBY_${profile.hobbies}`)}</span>
      </div>
      {(showBlankValue || profile.religion) && (
        <div className={styles.Cell}>
          <ProfileCellHeader
            title={'종교'}
            onClickEdit={() => onClickEdit?.('IDEAL_RELIGION')}
            suffix={renderBadge('종교')}
          />
          <span>{getReligionText(profile.religion, t)}</span>
        </div>
      )}
      {(showBlankValue || profile.drinking) && (
        <div className={styles.Cell}>
          <ProfileCellHeader
            title={'음주 빈도'}
            onClickEdit={() => onClickEdit?.('IDEAL_DRINKING')}
            suffix={renderBadge('음주 습관')}
          />
          <span>{getDrinkingText(profile.drinking, t)}</span>
        </div>
      )}
      {(showBlankValue || profile.smoking) && (
        <div className={styles.Cell}>
          <ProfileCellHeader
            title={'흡연여부'}
            onClickEdit={() => onClickEdit?.('IDEAL_SMOKING')}
            suffix={renderBadge('흡연 여부')}
          />
          <span>{getSmokingText(profile.smoking, 'IDEAL', t)}</span>
        </div>
      )}
      {(showBlankValue || profile.toMatchMaker) && (
        <div className={`${styles.Cell} ${styles.Introduce}`}>
          <ProfileCellHeader
            title={'주선자에게 전달하고 싶은 말'}
            onClickEdit={() => onClickEdit?.('IDEAL_TO_MATCHER')}
          />
          <span>{profile.toMatchMaker}</span>
        </div>
      )}
    </section>
  );
};
