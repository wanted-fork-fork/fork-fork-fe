import { UserInfoLocationCitiesItem, UserInfoLocationTownsItem } from 'src/types';

export type Location = {
  city: City;
  town: Town[];
};

export type City = {
  city: UserInfoLocationCitiesItem;
  cityName: string;
};

export type Town = {
  town: UserInfoLocationTownsItem;
  townName: string;
};
