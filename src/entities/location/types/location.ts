export type Location = {
  city: City;
  town: Town[];
};

export type City = {
  city: string;
  cityName: string;
};

export type Town = {
  town: string;
  townName: string;
};
