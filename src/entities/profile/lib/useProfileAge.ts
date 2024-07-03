import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';

export const useProfileAge = () => {
  return useMyProfileStore((state) => calculateAge(convertDateObjectToDate(state.birthDate)));
};
