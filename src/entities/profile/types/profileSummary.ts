export type Gender = 'FEMALE' | 'MALE';
export type Mbti = `${'E' | 'I'}${'S' | 'N'}${'F' | 'T'}${'J' | 'P'}`;

const JobTypeList = ['STUDENT', 'OFFICE_WORKER', 'FREELANCER', 'ETC'];
export type JobType = (typeof JobTypeList)[number];

export type Location = {
  name: string;
  subLocations?: Location[];
};

const ReligionTypeList = ['NONE', 'CHRISTIAN', 'BUDDHISM', 'CATHOLIC', 'WON_BUDDHISM', 'ETC'];
export type ReligionType = (typeof ReligionTypeList)[number];

export type ProfileSummary = {
  name: string;
  birthDate: Date;
  gender: Gender;
  imageSrcList: string[];
};
