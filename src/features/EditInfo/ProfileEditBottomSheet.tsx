import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import styles from 'src/processes/shortcut/Shortcut.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';

type Props = {
  stepMeta: StepMeta<MyProfile> | StepMeta<IdealPartner> | null;
  onClose: () => void;
  onCompleteEdit: () => void;
};

export const ProfileEditBottomSheet = ({ stepMeta, onClose, onCompleteEdit }: Props) => {
  const name = useProfileFirstName();
  return (
    <BottomSheet isOpen={Boolean(stepMeta)} onClose={onClose}>
      <BottomSheet.Header onPrev={onClose} onClose={onClose} />
      <BottomSheet.Content>
        {stepMeta && (
          <>
            <div className={styles.FormHeader}>
              <h2>{stepMeta.title({ name })}</h2>
              {stepMeta.description && <small className={styles.Description}>{stepMeta.description()}</small>}
            </div>
            <div className={styles.FormMain}>{stepMeta.form({})}</div>
            <div className={styles.FormFooter}>
              <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onCompleteEdit}>
                변경사항 저장
              </Button>
            </div>
          </>
        )}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
