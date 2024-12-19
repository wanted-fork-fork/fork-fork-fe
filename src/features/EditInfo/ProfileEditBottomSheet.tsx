import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ProfileEditBody } from 'src/features/EditInfo/ProfileEditBody';

type Props = {
  stepMeta: StepMeta<MyProfile> | StepMeta<IdealPartner> | null;
  onClose: () => void;
  onCompleteEdit: () => void;
};

export const ProfileEditBottomSheet = ({ stepMeta, onClose, onCompleteEdit }: Props) => {
  return (
    <BottomSheet isOpen={Boolean(stepMeta)} onClose={onClose}>
      <BottomSheet.Header onPrev={onClose} onClose={onClose} />
      <BottomSheet.Content>
        {stepMeta && <ProfileEditBody stepMeta={stepMeta} onCompleteEdit={onCompleteEdit} />}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
