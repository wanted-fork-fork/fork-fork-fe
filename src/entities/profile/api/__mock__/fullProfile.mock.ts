import { MyProfile } from 'src/entities/profile/model/myProfileStore';

export const fullProfileMock: MyProfile = {
  name: '김감자',
  gender: 'FEMALE',
  birthDate: {
    year: 1998,
    month: 3,
    date: 8,
  },
  height: 170,
  images: [],
  mbti: 'ISTP',
  job: {
    jobCategory: 'OFFICE_WORKER',
    jobName: '개발자',
  },
  location: [
    { city: { city: 'SEOUL', cityName: '서울시' }, town: [{ town: 'GANGNAM', townName: '강남구' }] },
    { city: { city: 'SUWON', cityName: '수원시' }, town: [{ town: 'PALDAL', townName: '팔달구' }] },
  ],
  religion: {
    religionCategory: 'NONE',
    religionName: '',
  },
  hobbies: [{ name: '🧗 클라이밍' }, { name: '🥐 맛집탐방' }, { name: '🎬 영화보기' }],
  drinking: '아주 가끔',
  smoking: {
    smokingCategory: 'NON_SMOKER',
  },
  introduction: '하이',
};
