import { Gender } from '../../../shared/types/Gender';

export type Profile = {
  name: string;
  birthDate: Date;
  gender: Gender;
  imageSrcList: string[];
};
