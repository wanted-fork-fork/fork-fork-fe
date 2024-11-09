import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export type EditProfileFunction = (key: string) => void;

type ProfileEditContextValue =
  | {
      canEdit: false;
    }
  | { canEdit: true; onEdit: EditProfileFunction };

const ProfileEditContext = createContext<ProfileEditContextValue>({
  canEdit: false,
});

export const ProfileEditProvider = ({ children, onEdit }: PropsWithChildren<{ onEdit: EditProfileFunction }>) => {
  const value = useMemo<ProfileEditContextValue>(
    () => ({
      canEdit: true,
      onEdit,
    }),
    [onEdit],
  );
  return <ProfileEditContext.Provider value={value}>{children}</ProfileEditContext.Provider>;
};

export const useProfileEditContext = () => {
  return useContext(ProfileEditContext);
};
