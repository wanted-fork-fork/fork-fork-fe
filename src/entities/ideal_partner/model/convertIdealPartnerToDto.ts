import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { DetailedInfoIdealPartner, IdealPartnerRequest, ImageDto } from 'src/types';
import { Location } from 'src/entities/location/types/location';

export const convertIdealPartnerToDto = (idealPartner: IdealPartner, images: ImageDto[]): IdealPartnerRequest => {
  return {
    ageRange: idealPartner.ageRange,
    heightRange: idealPartner.heightRange,
    style: idealPartner.style,
    images,
    location: {
      cities: idealPartner.locations.map((l) => l.city.city),
      towns: idealPartner.locations.flatMap((l) => l.town.map((t) => t.town)),
    },
    hobbies: idealPartner.hobbies.map((h) => h.name),
    drinking: idealPartner.drinking,
    religion: idealPartner.religion,
    smoking: idealPartner.smoking,
    requiredOptions: idealPartner.requiredOptions,
    toMatchMaker: idealPartner.toMatchMaker,
  };
};

export const convertDtoToIdealPartner = (dto: DetailedInfoIdealPartner): IdealPartner => {
  return {
    ageRange: dto.ageRange,
    drinking: dto.drinking,
    heightRange: dto.heightRange,
    hobbies: dto.hobbies?.map((h) => ({ name: h })) ?? [],
    images: [],
    imageDtoList: dto.images ?? [],
    locations:
      (dto.location?.towns
        .map((town, idx) => {
          const city = dto.location?.cities[idx];
          if (!city) return null;
          return dto.location?.cities[idx]
            ? ({
                town: [{ town, townName: `TOWN_${town}` }],
                city: { city, cityName: `CITY_${city}` },
              } satisfies Location)
            : null;
        })
        .filter(Boolean) as Location[]) || [],
    religion: dto.religion,
    requiredOptions: dto.requiredOptions ?? [],
    smoking: dto.smoking,
    style: dto.style ?? '',
    toMatchMaker: dto.toMatchMaker ?? '',
  };
};
