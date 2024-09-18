import { Drinking } from '../../../types';
import { t } from 'i18next';

export const getDrinkingText = (drinking: Drinking) => {
  return drinking.drinkingCategory === 'ETC' ? drinking.drinkingAmount : t(`DRINKING_${drinking.drinkingCategory}`);
};
