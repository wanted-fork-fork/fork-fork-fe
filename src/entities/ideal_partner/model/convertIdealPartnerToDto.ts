import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { IdealPartnerRequest, ImageDto } from 'src/types';

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
