import { ArrowLeft } from 'src/shared/ui/icons';
import { Button } from 'src/shared/ui/Button/Button';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import styles from './FormConfirmPage.module.css';
import { ProfileTab } from 'src/widgets/ProfileTab/ProfileTab';

export const FormConfirmPage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  return (
    <>
      <div className={styles.Wrapper}>
        <div>
          <Button variant={'ghost'} color={'neutral'} widthType={'fill'} size={'fit'}>
            <ArrowLeft />
          </Button>
        </div>
        <div className={styles.TitleSection}>
          <h2>입력한 정보를 마지막으로 확인해주세요.</h2>
          <small>각 답변을 선택하면 수정이 가능합니다.</small>
        </div>
        <ProfileTab profile={profile} idealPartner={idealPartner} />
        <div className={styles.Footer}>
          <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onClickNextStep}>
            확인했어요
          </Button>
        </div>
      </div>
    </>
  );
};
