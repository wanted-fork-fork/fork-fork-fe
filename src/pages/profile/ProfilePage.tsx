import { calculateAge, convertDateObjectToDate } from 'src/shared/functions/date';
import { ProfileTab } from 'src/entities/candidates/_common/components/ProfileTab/ProfileTab';
import styles from './ProfilePage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { useInView } from 'react-intersection-observer';
import { ImageLayout } from 'src/shared/ui/ImageLayout/ImageLayout';
import { useTranslation } from 'react-i18next';
import { ProfilePageHeader } from 'src/pages/profile/components/ProfilePageHeader';
import { ReactNode, useMemo } from 'react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { useNavigate } from '@remix-run/react';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { MyProfile, useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { AvatarWithComment } from 'src/entities/users/profiles/components/AvatarWithComment/AvatarWithComment';

export const ProfilePage = ({ headerSuffixSlot, comment }: {
  comment?: {
    creatorImg: string;
    creatorName: string;
    comment: string;
  };
  headerSuffixSlot: (profile: MyProfile) => ReactNode;
 }) => {
  const { ref, inView } = useInView();
  const navigate = useNavigate();

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
          <IconButton onClick={() => navigate(-1)}>
            <ArrowLeft color={Theme.color.neutral50} />
          </IconButton>
        }
        suffix={headerSuffixSlot(profile)}
        showTitle={!inView}
      />
      <ScrollView rootClassName={styles.Body}>
        <ImageLayout urls={urls} />
        <h1 className={styles.Name} ref={ref}>
          {profile.name}({t(profile.gender)}, {age})
        </h1>
        {comment && (
          <div className={styles.CommentContainer}>
            <AvatarWithComment
              creatorImg={comment.creatorImg}
              creatorName={comment.creatorName}
              comment={comment.comment}
              theme="gray"
            />
          </div>
        )}
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
