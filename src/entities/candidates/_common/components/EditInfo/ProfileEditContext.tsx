import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { ProfileEditBottomSheet } from 'src/entities/candidates/_common/components/EditInfo/ProfileEditBottomSheet';
import isEqual from 'lodash/isEqual';
import { pickNonFunctionValues } from 'src/shared/functions/pickNonFunctionValues';
import { MetaKey } from 'src/entities/candidates/_common/components/EditInfo/libs/getStepFromFormMeta';
import { MyProfile, MyProfileProvider, useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import {
  IdealPartner,
  IdealPartnerProvider,
  useIdealPartnerStore,
} from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';

export type EditProfileFunction = (key: MetaKey, extra?: object) => void;

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
  const [extra, setExtra] = useState<object | null>(null);

  const handleClickEdit = useCallback<EditProfileFunction>((key, extra) => {
    setSelectedKey(key);
    setExtra(extra ?? null);
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
            extra={extra}
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
