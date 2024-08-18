import { LocationCitiesItem, LocationTownsItem } from 'src/types';

export type Location = {
  city: City;
  town: Town[];
};

export type City = {
  city: LocationCitiesItem;
  cityName: string;
};

export type Town = {
  town: LocationTownsItem;
  townName: string;
};
