import { t } from 'i18next';
import { IdealPartnerDrinking, UserInfoDrinking } from 'src/types';

export const getDrinkingText = (drinking: UserInfoDrinking | IdealPartnerDrinking) => {
  return drinking.drinkingCategory === 'DRINKER'
    ? drinking.drinkingAmount || 'O'
    : t(`DRINKING_${drinking.drinkingCategory}`);
};
