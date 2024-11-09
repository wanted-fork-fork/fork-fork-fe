import styles from '../profile/ProfilePage.module.css';
import pageStyles from './EditInfoPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { ProfileTab } from 'src/widgets/ProfileTab/ProfileTab';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ProfilePageHeader } from 'src/pages/profile/components/ProfilePageHeader';
import { Button } from 'src/shared/ui/Button/Button';
import { ProfileEditProvider } from 'src/features/EditInfo/ProfileEditContext';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSubmit } from '@remix-run/react';
import { convertProfileToDto } from 'src/entities/profile/model/convertProfileToDto';
import { convertIdealPartnerToDto } from 'src/entities/ideal_partner/model/convertIdealPartnerToDto';

type Props = {
  infoId: string;
};

export const EditInfoPage = ({ infoId }: Props) => {
  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);

  const submit = useSubmit();

  const onCompleteEdit = useCallback((close: () => void) => {
    toast.success('변경사항이 저장되었습니다.');
    close();
  }, []);

  const onSubmit = () =>
    submit(
      {
        id: infoId,
        userInfo: JSON.stringify(convertProfileToDto(profile, profile.imageDtoList)),
        idealPartner: JSON.stringify(convertIdealPartnerToDto(idealPartner, idealPartner.imageDtoList)),
      },
      { method: 'post' },
    );

  return (
    <div className={styles.Wrapper}>
      <ProfilePageHeader
        profile={profile}
        showTitle
        suffix={
          <Button
            className={pageStyles.CompleteButton}
            size={'fit'}
            variant={'ghost'}
            widthType={'hug'}
            color={'primary'}
            onClick={onSubmit}
          >
            완료
          </Button>
        }
      />
      <ProfileEditProvider onCompleteEdit={onCompleteEdit}>
        <ScrollView rootClassName={styles.Body}>
          <ProfileTab.Root>
            <ProfileTab.TriggerList className={styles.TabTriggerList} />
            <div className={styles.TabContent}>
              <ProfileTab.Content profile={profile} idealPartner={idealPartner} initialOpen={true} />
            </div>
          </ProfileTab.Root>
        </ScrollView>
      </ProfileEditProvider>
    </div>
  );
};
