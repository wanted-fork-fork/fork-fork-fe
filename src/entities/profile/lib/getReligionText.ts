import { Religion } from 'src/types';
import { TFunction } from 'i18next';

export const getReligionText = (religion: Religion, t: TFunction) => {
  if (religion.religionCategory === 'ETC') {
    return religion.religionName;
  }
  return t(`RELIGION_${religion.religionCategory}`);
};
