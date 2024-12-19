import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ProfileEditBody } from 'src/features/EditInfo/ProfileEditBody';

type Props = {
  type: 'PROFILE' | 'IDEAL_PARTNER';
  stepMeta: StepMeta<MyProfile | IdealPartner> | null;
  onClose: () => void;
  onCompleteEdit: () => void;
};

export const ProfileEditBottomSheet = ({ type, stepMeta, onClose, onCompleteEdit }: Props) => {
  return (
    <BottomSheet isOpen={Boolean(stepMeta)} onClose={onClose}>
      <BottomSheet.Header onPrev={onClose} onClose={onClose} />
      <BottomSheet.Content>
        {stepMeta && <ProfileEditBody type={type} stepMeta={stepMeta} onCompleteEdit={onCompleteEdit} />}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
