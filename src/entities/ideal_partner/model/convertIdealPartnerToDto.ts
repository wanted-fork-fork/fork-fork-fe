import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { DetailedInfoIdealPartner, IdealPartnerRequest, ImageDto } from 'src/types';

export const convertIdealPartnerToDto = (idealPartner: IdealPartner, images: ImageDto[]): IdealPartnerRequest => {
  return {
    ageRange: idealPartner.ageRange || undefined,
    heightRange: idealPartner.heightRange || undefined,
    style: idealPartner.style,
    images,
    location: idealPartner.locations,
    hobbies: idealPartner.hobbies,
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
    hobbies: dto.hobbies,
    images: [],
    imageDtoList: dto.images ?? [],
    locations: dto.location ?? 'NOT_IMPORTANT',
    religion: dto.religion,
    requiredOptions: dto.requiredOptions ?? [],
    smoking: dto.smoking,
    style: dto.style ?? '',
    toMatchMaker: dto.toMatchMaker ?? '',
  };
};
