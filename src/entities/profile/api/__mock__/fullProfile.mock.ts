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
  selfImages: [],
  mbti: 'ISTP',
  job: {
    type: 'OFFICE_WORKER',
    description: '개발자',
  },
  location: [{ name: '서울시 강남구' }, { name: '경기도 수원시' }],
  religion: {
    type: 'NONE',
    description: '',
  },
  hobby: [{ name: '🧗 클라이밍' }, { name: '🥐 맛집탐방' }, { name: '🎬 영화보기' }],
  alcohol: '아주 가끔',
  smoking: 'NO',
  introduce: '하이',
};
