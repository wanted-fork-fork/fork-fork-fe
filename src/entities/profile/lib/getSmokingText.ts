import { Smoking } from 'src/types';
import { t } from 'i18next';

export const getSmokingText = (smoking: Smoking) => {
  if (smoking.smokingCategory === 'ETC') {
    return smoking.smokingAmount;
  }
  return t(`SMOKING_${smoking.smokingCategory}`);
};
