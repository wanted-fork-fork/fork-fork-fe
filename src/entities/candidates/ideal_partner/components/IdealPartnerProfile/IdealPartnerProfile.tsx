import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { useProfileEditContext } from 'src/entities/candidates/_common/components/EditInfo/ProfileEditContext';
import { useTranslation } from 'react-i18next';
import { IdealPartner, useIdealPartnerImages } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { getReligionText } from 'src/entities/candidates/info/utils/getReligionText';
import { getDrinkingText } from 'src/entities/candidates/info/utils/getDrinkingText';
import { getSmokingText } from 'src/entities/candidates/info/utils/getSmokingText';
import { getRangeText } from 'src/shared/functions/string';
import Flex from 'src/shared/ui/Flex/Flex';
import { Menu } from 'src/shared/ui/icons';
import { ReactNode, useCallback } from 'react';

const ImportantBadge = () => <span className={styles.RequiredBadge}>중요</span>;

export const IdealPartnerProfile = ({ profile }: { profile: IdealPartner }) => {
  const { t } = useTranslation();

  const value = useProfileEditContext();
  const onClickEdit = value.canEdit ? value.onEdit : undefined;
  const showEmpty = !value.canEdit && profile.skipped;

  const imageDtoList = useIdealPartnerImages();

  const showBlankValue = value.canEdit;

  const renderBadge = (key: string) => (profile.requiredOptions.includes(key) ? <ImportantBadge /> : <></>);

  const renderValue = useCallback(
    (value: ReactNode, key: keyof IdealPartner) => (profile[key] === null ? '-' : value),
    [profile],
  );

  return showEmpty ? (
    <Flex className={styles.Empty} direction={'vertical'} gap={24}>
      <img src={'/images/empty.png'} alt={'이상형 정보가 없습니다'} />
      <p>
        이상형 정보가 없습니다. <br /> 상단{' '}
        <span>
          <Menu width={16} height={14} />
        </span>{' '}
        &gt; 수정하기에서 내용을 추가하세요.
      </p>
    </Flex>
  ) : (
    <section className={styles.Grid}>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader
            title={'선호하는 연령대'}
            onClickEdit={() => onClickEdit?.('IDEAL_AGE')}
            suffix={renderBadge('나이')}
          />
          <span>
            {renderValue(
              profile.ageRange
                ? getRangeText(profile.ageRange, {
                    unit: '세',
                    singlePrefix: { min: '최소', max: '최대' },
                    empty: '상관 없어요',
                  })
                : '나이는 딱히 상관 없어요',
              'ageRange',
            )}
          </span>
        </div>
        <div className={styles.Cell}>
          <ProfileCellHeader
            title={'선호하는 키'}
            onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')}
            suffix={renderBadge('키 + 선호하는 스타일')}
          />
          <span>
            {renderValue(
              profile.heightRange &&
                getRangeText(profile.heightRange, {
                  unit: 'cm',
                  singlePrefix: { min: '최소', max: '최대' },
                  empty: '상관 없어요',
                }),
              'heightRange',
            )}
          </span>
        </div>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'선호하는 스타일'}
          onClickEdit={() => onClickEdit?.('IDEAL_HEIGHT_STYLE')}
          suffix={renderBadge('키 + 선호하는 스타일')}
        />
        <span>{renderValue(profile.style || '상관 없어요', 'style')}</span>
      </div>
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
        <span>{renderValue(t(`LOCATION_${profile.locations}`), 'locations')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'취미'}
          onClickEdit={() => onClickEdit?.('IDEAL_HOBBY')}
          suffix={renderBadge('취미')}
        />
        <span>{renderValue(t(`HOBBY_${profile.hobbies}`), 'hobbies')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'종교'}
          onClickEdit={() => onClickEdit?.('IDEAL_RELIGION')}
          suffix={renderBadge('종교')}
        />
        <span>{renderValue(profile.religion && getReligionText(profile.religion, t), 'religion')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'음주 빈도'}
          onClickEdit={() => onClickEdit?.('IDEAL_DRINKING')}
          suffix={renderBadge('음주 습관')}
        />
        <span>{renderValue(profile.drinking && getDrinkingText(profile.drinking, t), 'drinking')}</span>
      </div>
      <div className={styles.Cell}>
        <ProfileCellHeader
          title={'흡연여부'}
          onClickEdit={() => onClickEdit?.('IDEAL_SMOKING')}
          suffix={renderBadge('흡연 여부')}
        />
        <span>{renderValue(profile.smoking && getSmokingText(profile.smoking, 'IDEAL', t), 'smoking')}</span>
      </div>
      {(showBlankValue || profile.toMatchMaker) && (
        <div className={`${styles.Cell} ${styles.Introduce}`}>
          <ProfileCellHeader
            title={'주선자에게 전달하고 싶은 말'}
            onClickEdit={() => onClickEdit?.('IDEAL_TO_MATCHER')}
          />
          <span>{renderValue(profile.toMatchMaker, 'toMatchMaker')}</span>
        </div>
      )}
    </section>
  );
};
