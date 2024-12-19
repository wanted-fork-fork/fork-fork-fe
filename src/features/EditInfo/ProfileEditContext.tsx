import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { getStepFromFormMeta, MetaKey } from 'src/features/EditInfo/lib/getStepFromFormMeta';
import { ProfileEditBottomSheet } from 'src/features/EditInfo/ProfileEditBottomSheet';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';

export type EditProfileFunction = (key: MetaKey) => void;

type ProfileEditContextValue =
  | {
      canEdit: false;
    }
  | { canEdit: true; onEdit: EditProfileFunction };

const ProfileEditContext = createContext<ProfileEditContextValue>({
  canEdit: false,
});

export const ProfileEditProvider = ({
  children,
  onCompleteEdit,
}: PropsWithChildren<{ onCompleteEdit: (close: () => void) => void }>) => {
  const [selectedKey, setSelectedKey] = useState<MetaKey | null>(null);

  const type = selectedKey ?? '' in MyProfileStepMeta ? 'PROFILE' : 'IDEAL_PARTNER';
  const selectedStep = getStepFromFormMeta(selectedKey) as StepMeta<MyProfile | IdealPartner>;

  const handleClickEdit = useCallback<EditProfileFunction>((key) => {
    setSelectedKey(key);
  }, []);

  const handleClose = useCallback(() => setSelectedKey(null), [setSelectedKey]);

  const handleCompleteEdit = useCallback(() => {
    onCompleteEdit(handleClose);
  }, [handleClose, onCompleteEdit]);

  const value = useMemo<ProfileEditContextValue>(
    () => ({
      canEdit: true,
      onEdit: handleClickEdit,
    }),
    [handleClickEdit],
  );

  return (
    <ProfileEditContext.Provider value={value}>
      {children}
      <ProfileEditBottomSheet
        type={type}
        stepMeta={selectedStep}
        onClose={handleClose}
        onCompleteEdit={handleCompleteEdit}
      />
    </ProfileEditContext.Provider>
  );
};

export const useProfileEditContext = () => {
  return useContext(ProfileEditContext);
};
