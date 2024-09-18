import { Location } from '../../location/types/location';

export const getLocationText = (location: Location) => {
  return location.town.map((t) => `${location.city.cityName} ${t.townName}`);
};
