export type Gender = 'FEMALE' | 'MALE';
export type ProfileSummary = {
  name: string;
  birthDate: Date;
  gender: Gender;
  imageSrcList: string[];
};
