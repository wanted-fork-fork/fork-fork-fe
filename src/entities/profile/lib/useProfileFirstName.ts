import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

export const useProfileFirstName = () => {
  return useMyProfileStore((state) => state.name?.slice(1) ?? '');
};
