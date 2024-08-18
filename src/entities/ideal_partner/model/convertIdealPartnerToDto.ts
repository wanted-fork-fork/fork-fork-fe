import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { DetailedInfoIdealPartner, IdealPartnerRequest, ImageDto } from 'src/types';

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
    locations: [],
    religion: dto.religion,
    requiredOptions: dto.requiredOptions ?? [],
    smoking: dto.smoking,
    style: dto.style ?? '',
    toMatchMaker: dto.toMatchMaker ?? '',
  };
};
