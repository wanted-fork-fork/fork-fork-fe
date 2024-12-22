import { IdealPartnerSmoking, UserInfoSmoking } from 'src/types';
import { t } from 'i18next';

export const getSmokingText = (smoking: UserInfoSmoking | IdealPartnerSmoking, type: 'IDEAL' | 'INFO') => {
  if (smoking.smokingCategory === 'ETC') {
    return smoking.smokingAmount;
  }
  return t(`${type}_SMOKING_${smoking.smokingCategory}`);
};
