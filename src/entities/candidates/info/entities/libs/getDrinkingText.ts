import { TFunction } from 'i18next';
import { IdealPartnerDrinking, UserInfoDrinking } from 'src/types';

export const getDrinkingText = (drinking: UserInfoDrinking | IdealPartnerDrinking, t: TFunction) => {
  return drinking.drinkingCategory === 'DRINKER'
    ? drinking.drinkingAmount || 'O'
    : t(`DRINKING_${drinking.drinkingCategory}`);
};
