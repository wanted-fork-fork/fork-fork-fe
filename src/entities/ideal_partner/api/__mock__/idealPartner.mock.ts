import { IdealPartner } from 'src/entities/ideal_partner/model/idealPartnerStore';

export const MockIdealPartner: IdealPartner = {
  ageRange: { max: 25, min: 20 },
  drinking: { drinkingAmount: '주 1-2회 가볍게는 괜찮아요', drinkingCategory: '' },
  heightRange: { max: 180, min: 175 },
  hobbies: [{ name: '맛집탐방' }, { name: '뜨개질' }],
  images: [],
  locations: [
    { city: { cityName: '서울시', city: 'SEOUL' }, town: [{ town: 'GANGNAM', townName: '강남구' }] },
    { city: { cityName: '경기도', city: 'GYEONGGI' }, town: [{ town: 'SUWON', townName: '수원시' }] },
  ],
  religion: { religionCategory: 'NONE', religionName: '' },
  requiredOptions: [],
  smoking: { smokingAmount: '', smokingCategory: 'NON_SMOKER' },
  style: '눈이 크신 분',
  toMatchMaker: '잘 부탁드립니다 !',
};
