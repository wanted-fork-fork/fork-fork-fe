import { Religion } from 'src/types';
import { t } from 'i18next';

export const getReligionText = (religion: Religion) => {
  if (religion.religionCategory === 'ETC') {
    return religion.religionName;
  }
  return t(`RELIGION_${religion.religionCategory}`);
};
