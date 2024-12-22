import { t } from 'i18next';
import { IdealPartnerDrinking, UserInfoDrinking } from 'src/types';

export const getDrinkingText = (drinking: UserInfoDrinking | IdealPartnerDrinking) => {
  return t(`DRINKING_${drinking.drinkingCategory}`);
};
