import styles from '../profile/ProfilePage.module.css';
import pageStyles from './EditInfoPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { ProfileTab } from 'src/entities/candidates/_common/components/ProfileTab/ProfileTab';
import { ProfilePageHeader } from 'src/pages/profile/components/ProfilePageHeader';
import { Button } from 'src/shared/ui/Button/Button';
import { ProfileEditProvider } from 'src/entities/candidates/_common/components/EditInfo/ProfileEditContext';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useBeforeUnload, useNavigate, useNavigation, useSubmit } from '@remix-run/react';
import { useUploadProfileImage } from 'src/shared/functions/useUploadProfileImage';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { Theme } from 'src/shared/styles/constants';
import { ArrowLeft } from 'src/shared/ui/icons';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { convertProfileToDto } from 'src/entities/candidates/info/models/convertProfileToDto';
import { convertIdealPartnerToDto } from 'src/entities/candidates/ideal_partner/models/convertIdealPartnerToDto';

type Props = {
  infoId: string;
};

export const EditInfoPage = ({ infoId }: Props) => {
  useBeforeUnload((e) => e.preventDefault());

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);

  const submit = useSubmit();
  const { state } = useNavigation();

  const { upload } = useUploadProfileImage();
  const [isUploading, setUploading] = useState(false);

  const onCompleteEdit = useCallback((close: () => void) => {
    toast.success('변경사항이 저장되었습니다.');
    close();
  }, []);

  const onSubmit = useCallback(async () => {
    setUploading(true);
    const { profileImageResults, idealImageResults } = await upload(profile.images, idealPartner.images);

    setUploading(false);

    const profileImageDtos = [...profile.imageDtoList, ...profileImageResults];
    const idealImageDtos = [...idealPartner.imageDtoList, ...idealImageResults];

    submit(
      {
        id: infoId,
        userInfo: JSON.stringify(convertProfileToDto(profile, profileImageDtos)),
        idealPartner: JSON.stringify(convertIdealPartnerToDto(idealPartner, idealImageDtos)),
      },
      { method: 'post' },
    );
  }, [idealPartner, infoId, profile, submit, upload]);

  const [openConfirm, setConfirm] = useState(false);
  const onClickPrev = () => setConfirm(true);

  const closeConfirm = () => setConfirm(false);

  const navigate = useNavigate();
  const onNavigatePrev = useCallback(() => {
    navigate(-1);
  }, [infoId, navigate]);

  return (
    <>
      <div className={styles.Wrapper}>
        <ProfilePageHeader
          profile={profile}
          showTitle
          prefix={
            <IconButton onClick={onClickPrev}>
              <ArrowLeft color={Theme.color.neutral50} />
            </IconButton>
          }
          suffix={
            <Button
              className={pageStyles.CompleteButton}
              size={'fit'}
              variant={'ghost'}
              widthType={'hug'}
              color={'primary'}
              onClick={onSubmit}
              disabled={isUploading || state === 'submitting'}
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
      <ConfirmModal
        show={openConfirm}
        title={'변경사항을 저장하지 않고 나가시나요?'}
        description={'저장하지 않고 나가면 바뀐 정보가 사라져요.'}
        cancelText={'나갈게요'}
        confirmText={'저장 후 종료'}
        onCancel={onNavigatePrev}
        onConfirm={onSubmit}
        onClose={closeConfirm}
      />
    </>
  );
};
