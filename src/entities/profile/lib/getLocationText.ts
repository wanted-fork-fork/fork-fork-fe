import { Location } from '../../location/types/location';
import { t } from 'i18next';

export const getLocationText = (location: Location) => {
  return location.town.map((town) => `${t(location.city.cityName)} ${t(town.townName)}`);
};
