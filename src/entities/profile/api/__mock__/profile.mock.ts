import { ProfileSummary } from 'src/entities/profile/types/profileSummary';

export const profileMock: ProfileSummary = {
  name: '강이름',
  birthDate: new Date('1996-05-15'),
  gender: 'FEMALE',
  imageSrcList: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/20230905_Haerin_%28NewJeans%29.jpg/250px-20230905_Haerin_%28NewJeans%29.jpg',
  ],
};
