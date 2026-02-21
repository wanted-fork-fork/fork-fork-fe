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
    style: idealPartner.style || undefined,
    images,
    location: idealPartner.locations || undefined,
    hobbies: idealPartner.hobbies || undefined,
    drinking: idealPartner.drinking || undefined,
    religion: idealPartner.religion || undefined,
    smoking: idealPartner.smoking || undefined,
    requiredOptions: idealPartner.requiredOptions,
    toMatchMaker: idealPartner.toMatchMaker || undefined,
  };
};

export const convertDtoToIdealPartner = (dto: DetailedInfoIdealPartner): IdealPartner => {
  return {
    skipped: false,
    ageRange: dto.ageRange,
    drinking: dto.drinking || null,
    heightRange: dto.heightRange,
    hobbies: dto.hobbies || null,
    images: [],
    imageDtoList: dto.images ?? [],
    locations: dto.location ?? 'NOT_IMPORTANT',
    religion: dto.religion || null,
    requiredOptions: dto.requiredOptions ?? [],
    smoking: dto.smoking || null,
    style: dto.style ?? '',
    toMatchMaker: dto.toMatchMaker ?? '',
  };
};

export const getSkippedIdealPartnerState = (): IdealPartner => {
  return {
    skipped: true,
    ageRange: {},
    drinking: {
      drinkingCategory: 'ETC',
    },
    heightRange: {},
    hobbies: 'NOT_IMPORTANT',
    images: [],
    imageDtoList: [],
    locations: 'NOT_IMPORTANT',
    religion: {
      religionCategory: 'ETC',
    },
    requiredOptions: [],
    smoking: {
      smokingCategory: 'ETC',
    },
    style: '',
    toMatchMaker: '',
  };
};
