import { ProfileSummary } from 'src/entities/profile/types/profileSummary';
import dayjs from 'dayjs';

export const profileMock: ProfileSummary = {
  images: [],
  name: '강이름',
  birthDate: dayjs('1996/05/15').toString(),
  gender: 'MALE',
  height: 160,
  hobbies: ['뜨개질'],
  job: {
    jobCategory: 'STUDENT',
    jobName: '',
  },
  location: {
    cities: ['JEOLANAM', 'SEOUL'],
    towns: ['IKSAN', 'SEOCHO'],
  },
  mbti: 'ISFJ',
  religion: {
    religionCategory: 'CATHOLICISM',
  },
  smoking: {
    smokingCategory: 'NON_SMOKER',
  },
  drinking: {
    drinkingCategory: 'NON_DRINKER',
  },
  // imageSrcList: [
  //   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
  // ],
};
