import { Location } from 'src/entities/candidates/_common/vo/location/types/location';
import { TFunction } from 'i18next';

export const getLocationText = (location: Location, t: TFunction) => {
  return location.town.map((town) => `${t(location.city.cityName)} ${t(town.townName)}`);
};
