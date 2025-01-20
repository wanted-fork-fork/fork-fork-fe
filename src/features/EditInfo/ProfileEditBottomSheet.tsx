import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ProfileEditBody } from 'src/features/EditInfo/ProfileEditBody';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { getStepFromFormMeta, MetaKey } from 'src/features/EditInfo/lib/getStepFromFormMeta';

type Props = {
  selectedKey: MetaKey | null;
  onClose: () => void;
  onCompleteEdit: (profile: MyProfile, ideal: IdealPartner) => void;
};

export const ProfileEditBottomSheet = ({ selectedKey, onClose, onCompleteEdit }: Props) => {
  const type = selectedKey ?? '' in MyProfileStepMeta ? 'PROFILE' : 'IDEAL_PARTNER';
  const stepMeta = getStepFromFormMeta(selectedKey) as StepMeta<MyProfile | IdealPartner>;

  return (
    <BottomSheet isOpen={Boolean(stepMeta)} onClose={onClose} disableDrag>
      <BottomSheet.Header onPrev={onClose} onClose={onClose} />
      <BottomSheet.Content>
        {stepMeta && <ProfileEditBody type={type} stepMeta={stepMeta} onCompleteEdit={onCompleteEdit} />}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
