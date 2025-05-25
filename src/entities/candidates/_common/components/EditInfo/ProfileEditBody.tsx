import styles from 'src/entities/candidates/_common/components/Shortcut/Shortcut.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile, useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { IdealPartner, useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { useProfileFirstName } from 'src/entities/candidates/info/utils/useProfileFirstName';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';

type Props<T extends 'PROFILE' | 'IDEAL_PARTNER'> = {
  selectedKey?: T extends 'PROFILE' ? keyof typeof MyProfileStepMeta : keyof typeof IdealPartnerStepMeta | null;
  type: T;
  extra?: object | null;
  stepMeta: StepMeta<T extends 'PROFILE' ? MyProfile : IdealPartner>;
  onCompleteEdit: (profile: MyProfile, ideal: IdealPartner) => void;
};

export const ProfileEditBody = ({
  selectedKey,
  type,
  extra,
  stepMeta,
  onCompleteEdit,
}: Props<'PROFILE' | 'IDEAL_PARTNER'>) => {
  const name = useProfileFirstName();
  const profileState = useMyProfileStore((state) => state);
  const idealState = useIdealPartnerStore((state) => state);
  const hasTouchedProfile = useMyProfileFormProcessStore((state) => state.hasTouchedStep);
  const touchedIdeal = useIdealPartnerFormProcessStore((state) => state.touchedSteps);
  const canGoNext =
    stepMeta.canGoNext(type === 'PROFILE' ? profileState : idealState) ||
    (selectedKey &&
      (type === 'PROFILE'
        ? hasTouchedProfile(selectedKey as keyof typeof MyProfileStepMeta)
        : touchedIdeal.has(selectedKey as keyof typeof IdealPartnerStepMeta)));

  const handleClickComplete = () => {
    onCompleteEdit(profileState, idealState);
  };

  return (
    <>
      <div className={styles.FormHeader}>
        <h2>{stepMeta.title({ name })}</h2>
        {'description' in stepMeta && stepMeta.description && (
          <small className={styles.Description}>{stepMeta.description()}</small>
        )}
      </div>
      <div className={styles.FormMain}>{stepMeta.form({ extra })}</div>
      <div className={styles.FormFooter}>
        <Button
          variant={'filled'}
          widthType={'fill'}
          color={'primary'}
          onClick={handleClickComplete}
          disabled={!canGoNext}
        >
          변경사항 저장
        </Button>
      </div>
    </>
  );
};
