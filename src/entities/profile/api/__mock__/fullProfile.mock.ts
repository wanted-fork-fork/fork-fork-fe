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
    jobCategory: 'EMPLOYEE',
    jobName: '개발자',
  },
  location: [
    { city: { city: 'SEOUL', cityName: '서울시' }, town: [{ town: 'GANGNAM', townName: '강남구' }] },
    { city: { city: 'GYEONGGI', cityName: '경기도' }, town: [{ town: 'SUWON', townName: '수원시' }] },
  ],
  religion: {
    religionCategory: 'ETC',
    religionName: '',
  },
  hobbies: [{ name: '🧗 클라이밍' }, { name: '🥐 맛집탐방' }, { name: '🎬 영화보기' }],
  drinking: '아주 가끔',
  smoking: {
    smokingCategory: 'NON_SMOKER',
  },
  introduction: '하이',
  book: { bookName: '제목', cause: '그냥' },
  dateStyle: [],
  foods: ['🍝 파스타'],
  movie: { movieName: '라라랜드', cause: '그냥' },
  pets: ['🐶 강아지'],
};
