import { Smoking } from 'src/types';
import { t } from 'i18next';

export const getSmokingText = (smoking: Smoking, type: 'IDEAL' | 'INFO') => {
  if (smoking.smokingCategory === 'ETC') {
    return smoking.smokingAmount;
  }
  return t(`${type}_SMOKING_${smoking.smokingCategory}`);
};
