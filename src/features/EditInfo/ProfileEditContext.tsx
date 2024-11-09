import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { getStepFromFormMeta, MetaKey } from 'src/features/EditInfo/lib/getStepFromFormMeta';
import { ProfileEditBottomSheet } from 'src/features/EditInfo/ProfileEditBottomSheet';

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
  const selectedStep = getStepFromFormMeta(selectedKey);

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
      <ProfileEditBottomSheet stepMeta={selectedStep} onClose={handleClose} onCompleteEdit={handleCompleteEdit} />
    </ProfileEditContext.Provider>
  );
};

export const useProfileEditContext = () => {
  return useContext(ProfileEditContext);
};
