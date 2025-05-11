import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';

export const useProfileFirstName = () => {
  return useMyProfileStore((state) => state.name?.slice(1) ?? '');
};
