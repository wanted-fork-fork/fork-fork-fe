import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { ProfileEditBody } from 'src/entities/candidates/_common/components/EditInfo/ProfileEditBody';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import { useBoolean } from 'src/shared/functions/useBoolean';
import {
  getStepFromFormMeta,
  MetaKey,
} from 'src/entities/candidates/_common/components/EditInfo/libs/getStepFromFormMeta';
import { MyProfile, useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { IdealPartner, useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';

type Props = {
  selectedKey: MetaKey | null;
  extra?: object | null;
  onClose: () => void;
  onCompleteEdit: (profile: MyProfile, ideal: IdealPartner) => void;
  checkEdit: (profile: MyProfile, ideal: IdealPartner) => boolean;
};

export const ProfileEditBottomSheet = ({ selectedKey, extra, onClose, onCompleteEdit, checkEdit }: Props) => {
  const { value: showConfirm, setTrue: openConfirm, setFalse: closeConfirm } = useBoolean(false);

  const profileState = useMyProfileStore((state) => state);
  const idealState = useIdealPartnerStore((state) => state);

  const type = selectedKey ?? '' in MyProfileStepMeta ? 'PROFILE' : 'IDEAL_PARTNER';
  const stepMeta = getStepFromFormMeta(selectedKey) as StepMeta<MyProfile | IdealPartner>;

  const handleClose = () => {
    if (checkEdit(profileState, idealState)) {
      openConfirm();
    } else {
      onClose();
    }
  };

  const handleConfirm = () => {
    onCompleteEdit(profileState, idealState);
    closeConfirm();
  };

  const handleCloseConfirm = () => {
    onClose();
    closeConfirm();
  };

  return (
    <>
      <BottomSheet isOpen={Boolean(stepMeta)} onClose={handleClose} disableDrag>
        <BottomSheet.Header onPrev={handleClose} onClose={handleClose} />
        <BottomSheet.Content>
          {stepMeta && (
            <ProfileEditBody type={type} stepMeta={stepMeta} extra={extra} onCompleteEdit={onCompleteEdit} />
          )}
        </BottomSheet.Content>
      </BottomSheet>
      <ConfirmModal
        show={showConfirm}
        title={'변경사항을 저장하지 않고 나가시나요?'}
        description={'저장하지 않고 나가면 바뀐 정보가 사라져요.'}
        cancelText={'나갈게요'}
        confirmText={'저장 후 종료'}
        onCancel={handleCloseConfirm}
        onConfirm={handleConfirm}
        onClose={closeConfirm}
      />
    </>
  );
};
