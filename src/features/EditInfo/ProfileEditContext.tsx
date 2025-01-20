import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { MetaKey } from 'src/features/EditInfo/lib/getStepFromFormMeta';
import { ProfileEditBottomSheet } from 'src/features/EditInfo/ProfileEditBottomSheet';
import { MyProfile, MyProfileProvider, useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import {
  IdealPartner,
  IdealPartnerProvider,
  useIdealPartnerStore,
} from 'src/entities/ideal_partner/model/idealPartnerStore';
import isEqual from 'lodash/isEqual';
import { pickNonFunctionValues } from 'src/shared/functions/pickNonFunctionValues';

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
  const originProfileState = useMyProfileStore((state) => state);
  const overrideOriginProfileState = useMyProfileStore((state) => state.override);
  const originIdealState = useIdealPartnerStore((state) => state);
  const overrideOriginIdealState = useIdealPartnerStore((state) => state.override);

  const [selectedKey, setSelectedKey] = useState<MetaKey | null>(null);

  const handleClickEdit = useCallback<EditProfileFunction>((key) => {
    setSelectedKey(key);
  }, []);

  const handleClose = useCallback(() => setSelectedKey(null), [setSelectedKey]);

  const handleCompleteEdit = useCallback(
    (profile: MyProfile, ideal: IdealPartner) => {
      onCompleteEdit(handleClose);
      overrideOriginProfileState(profile);
      overrideOriginIdealState(ideal);
    },
    [handleClose, onCompleteEdit, overrideOriginIdealState, overrideOriginProfileState],
  );

  const checkEdit = (profile: MyProfile, ideal: IdealPartner) => {
    return (
      !isEqual(pickNonFunctionValues(profile), pickNonFunctionValues(originProfileState)) ||
      !isEqual(pickNonFunctionValues(ideal), pickNonFunctionValues(originIdealState))
    );
  };

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
      <MyProfileProvider initialState={originProfileState}>
        <IdealPartnerProvider initialState={originIdealState}>
          <ProfileEditBottomSheet
            selectedKey={selectedKey}
            onClose={handleClose}
            onCompleteEdit={handleCompleteEdit}
            checkEdit={checkEdit}
          />
        </IdealPartnerProvider>
      </MyProfileProvider>
    </ProfileEditContext.Provider>
  );
};

export const useProfileEditContext = () => {
  return useContext(ProfileEditContext);
};
