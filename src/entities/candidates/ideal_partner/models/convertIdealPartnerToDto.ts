import { DetailedInfoIdealPartner, IdealPartnerRequest, ImageDto } from 'src/types';
import { IdealPartner } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';

export const convertIdealPartnerToDto = (idealPartner: IdealPartner, images: ImageDto[]): IdealPartnerRequest => {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ageRange: idealPartner.ageRange || undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
    skipped: false,
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
