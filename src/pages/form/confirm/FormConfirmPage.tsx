import { Button } from 'src/shared/ui/Button/Button';
import styles from './FormConfirmPage.module.css';
import { ProfileTab } from 'src/entities/candidates/components/ProfileTab/ProfileTab';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { ProfileEditProvider } from 'src/entities/candidates/components/EditInfo/ProfileEditContext';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';

export const FormConfirmPage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);

  const onCompleteEdit = useCallback((close: () => void) => {
    toast.success('변경사항이 저장되었습니다.', { icon: null });
    close();
  }, []);

  return (
    <div className={styles.Wrapper}>
      <Header className={styles.InnerHeader} onPrev={console.log} />
      <div className={styles.TitleSection}>
        <h2>입력한 정보를 마지막으로 확인해주세요.</h2>
        <small>각 답변을 선택하면 수정이 가능합니다.</small>
      </div>
      <ProfileEditProvider onCompleteEdit={onCompleteEdit}>
        <ProfileTab profile={profile} idealPartner={idealPartner} />
      </ProfileEditProvider>
      <div className={styles.Footer}>
        <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onClickNextStep}>
          확인했어요
        </Button>
      </div>
    </div>
  );
};
