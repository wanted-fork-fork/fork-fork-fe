import { calculateAge, convertDateObjectToDate } from 'src/shared/functions/date';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

export const useProfileAge = () => {
  return useMyProfileStore((state) => calculateAge(convertDateObjectToDate(state.birthDate)));
};
