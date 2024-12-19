import styles from 'src/processes/shortcut/Shortcut.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile, useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner, useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';

type Props<T extends 'PROFILE' | 'IDEAL_PARTNER'> = {
  type: T;
  stepMeta: StepMeta<T extends 'PROFILE' ? MyProfile : IdealPartner>;
  onCompleteEdit: () => void;
};

export const ProfileEditBody = ({ type, stepMeta, onCompleteEdit }: Props<'PROFILE' | 'IDEAL_PARTNER'>) => {
  const name = useProfileFirstName();
  const profileState = useMyProfileStore((state) => state);
  const idealState = useIdealPartnerStore((state) => state);

  const canGoNext = stepMeta.canGoNext(type === 'PROFILE' ? profileState : idealState);

  return (
    <>
      <div className={styles.FormHeader}>
        <h2>{stepMeta.title({ name })}</h2>
        {'description' in stepMeta && stepMeta.description && (
          <small className={styles.Description}>{stepMeta.description()}</small>
        )}
      </div>
      <div className={styles.FormMain}>{stepMeta.form({})}</div>
      <div className={styles.FormFooter}>
        <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onCompleteEdit} disabled={!canGoNext}>
          변경사항 저장
        </Button>
      </div>
    </>
  );
};
