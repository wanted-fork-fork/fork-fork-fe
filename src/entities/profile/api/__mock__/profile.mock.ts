import { ProfileSummary } from 'src/entities/profile/types/profileSummary';

export const profileMock: ProfileSummary = {
  name: '강이름',
  birthDate: new Date('1996-05-15').toString(),
  gender: 'MALE',
  height: 160,
  hobbies: ['뜨개질'],
  job: {
    jobCategory: 'STUDENT',
    jobName: '',
  },
  location: {
    cities: [],
    towns: [],
  },
  mbti: 'ISFJ',
  religion: {
    religionCategory: 'CATHOLICISM',
  },
  smoking: {
    smokingCategory: 'NON_SMOKER',
  },
  drinking: '안마셔요',
  // imageSrcList: [
  //   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
  // ],
};
