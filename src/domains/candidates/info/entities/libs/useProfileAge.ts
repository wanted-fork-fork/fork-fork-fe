import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import { useMyProfileStore } from 'src/domains/candidates/info/entities/models/myProfileStore';

export const useProfileAge = () => {
  return useMyProfileStore((state) => calculateAge(convertDateObjectToDate(state.birthDate)));
};
