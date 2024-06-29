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
  location: [{ name: '서울시 강남구' }, { name: '경기도 수원시' }],
  religion: {
    religionCategory: 'NONE',
    religionName: '',
  },
  hobbies: [{ name: '🧗 클라이밍' }, { name: '🥐 맛집탐방' }, { name: '🎬 영화보기' }],
  drinking: '아주 가끔',
  smoking: 'NO',
  introduction: '하이',
};
