import styles from 'src/processes/shortcut/Shortcut.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';

type Props = {
  stepMeta: StepMeta<MyProfile> | StepMeta<IdealPartner>;
  onCompleteEdit: () => void;
};

export const ProfileEditBody = ({ stepMeta, onCompleteEdit }: Props) => {
  const name = useProfileFirstName();

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
        <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onCompleteEdit}>
          변경사항 저장
        </Button>
      </div>
    </>
  );
};
