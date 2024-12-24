import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';

export const MockIdealPartner: IdealPartner = {
  imageDtoList: [],
  ageRange: { max: 25, min: 20 },
  drinking: { drinkingAmount: '주 1-2회 가볍게는 괜찮아요', drinkingCategory: 'ONE_TWO_TIMES_A_WEEK' },
  heightRange: { max: 180, min: 175 },
  hobbies: 'NOT_IMPORTANT',
  images: [],
  locations: 'IMPORTANT',
  religion: { religionCategory: 'ETC', religionName: '' },
  requiredOptions: ['나이', '지역'],
  smoking: { smokingAmount: '', smokingCategory: 'DOESNT_MATTER' },
  style: '눈이 크신 분',
  toMatchMaker: '잘 부탁드립니다 !',
};
