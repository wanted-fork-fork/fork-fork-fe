import { Gender } from '@repo/configs-typescript';

export type Profile = {
  name: string;
  birthDate: Date;
  gender: Gender;
  imageSrcList: string[];
};
