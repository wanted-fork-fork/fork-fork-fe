import styles from 'src/pages/profile/ProfilePage.module.css';
import { ProfilePageHeader } from 'src/pages/profile/components/ProfilePageHeader';
import { Link } from '@remix-run/react';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { ImageLayout } from 'src/shared/ui/ImageLayout/ImageLayout';
import { ProfileTab } from 'src/entities/candidates/_common/components/ProfileTab/ProfileTab';
import { useInView } from 'react-intersection-observer';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { calculateAge, convertDateObjectToDate } from 'src/shared/functions/date';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MemberRow } from 'src/entities/groups/components/member_row/MemberRow';
import { groupMemberMock } from 'src/entities/groups/mocks/groupInfoMock';

export const GroupSharedProfilePage = ({ infoId }: { infoId: string }) => {
  const { ref, inView } = useInView();

  const { t } = useTranslation();

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  const urls = useMemo(() => profile.imageDtoList.map((image) => image.url), [profile.imageDtoList]);

  return (
    <div className={styles.Wrapper}>
      <ProfilePageHeader
        profile={profile}
        prefix={
          <Link to={'/'}>
            <IconButton>
              <ArrowLeft color={Theme.color.neutral50} />
            </IconButton>
          </Link>
        }
        showTitle={!inView}
      />
      <ScrollView rootClassName={styles.Body}>
        <ImageLayout urls={urls} />
        <div>
          <h1 className={`${styles.Name} ${styles.NameWithMessage}`} ref={ref}>
            {profile.name}({t(profile.gender)}, {age})
          </h1>
          <MemberRow
            member={groupMemberMock}
            bottom={
              <div className={styles.MessageBox}>
                <svg
                  className={styles.Arrow}
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.5 11.7578L0 0.5H6.5V11.7578Z" fill="#F7F7F7" />
                </svg>
                <span>착하고 재밌고 어쩌구 저쩌구</span>
              </div>
            }
          />
        </div>
        <ProfileTab.Root>
          <ProfileTab.TriggerList className={styles.TabTriggerList} />
          <div className={styles.TabContent}>
            <ProfileTab.Content profile={profile} idealPartner={idealPartner} initialOpen={true} />
          </div>
        </ProfileTab.Root>
      </ScrollView>
    </div>
  );
};
