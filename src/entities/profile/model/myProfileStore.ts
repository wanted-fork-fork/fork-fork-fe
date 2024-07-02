import { create } from 'zustand';
import { Gender, JobType, ReligionType } from 'src/entities/profile/types/profileSummary';
import { Location } from 'src/entities/location/types/location';
import { Hobby } from 'src/processes/my_profile/HobbyForm/HobbyForm';
import { DateObj } from 'src/shared/vo/date';
import { Mbti } from 'src/shared/vo/mbti';

export type MyProfile = {
  name: string;
  gender?: Gender;
  birthDate: Partial<DateObj>;
  height?: number;
  images: File[];
  mbti?: Mbti | null;
  job: {
    jobCategory: JobType | null;
    jobName: string;
  };
  location: Location[];
  religion: {
    religionCategory?: ReligionType;
    religionName?: string;
  };
  hobbies: Hobby[];
  drinking: string;
  smoking?: 'YES' | 'NO' | string;
  introduction: string;
};

type Action = {
  setName: (name: MyProfile['name']) => void;
  setGender: (gender: Gender) => void;
  setBirthYear: (year: number) => void;
  setBirthMonth: (month: number) => void;
  setBirthDate: (date: number) => void;
  setHeight: (height: number) => void;
  setSelfImages: (getState: (prevFiles: File[]) => File[]) => void;
  setMbti: (mbti: Mbti | null) => void;
  setJobCategory: (job: JobType) => void;
  setJobName: (description: string) => void;
  setLocation: (locations: Location[]) => void;
  setReligionCategory: (job: ReligionType) => void;
  setReligionName: (description: string) => void;
  setHobbies: (hobbies: Hobby[]) => void;
  setDrinking: (value: string) => void;
  setSmoking: (value: string) => void;
  setIntroduction: (value: string) => void;
};

export const useMyProfileStore = create<MyProfile & Action>((set, get) => ({
  name: '',
  setName: (name) => set({ name }),
  gender: undefined,
  setGender: (gender) => set({ gender }),
  birthDate: {
    year: undefined,
    month: undefined,
    date: undefined,
  },
  setBirthYear: (year) => set((state) => ({ birthDate: { ...state.birthDate, year } })),
  setBirthMonth: (month) => set((state) => ({ birthDate: { ...state.birthDate, month } })),
  setBirthDate: (date) => set((state) => ({ birthDate: { ...state.birthDate, date } })),
  height: undefined,
  setHeight: (height) => set({ height }),
  images: [],
  setSelfImages: (getState) => set({ images: getState(get().images) }),
  mbti: undefined,
  setMbti: (mbti) => set({ mbti }),
  job: {
    jobCategory: null,
    jobName: '',
  },
  setJobCategory: (job) => set({ job: { ...get().job, jobCategory: job } }),
  setJobName: (desc) => set({ job: { ...get().job, jobName: desc } }),
  location: [],
  setLocation: (locations) => set({ location: locations }),
  religion: {
    religionCategory: undefined,
    religionName: '',
  },
  setReligionCategory: (religion) => set({ religion: { ...get().religion, religionCategory: religion } }),
  setReligionName: (desc) => set({ religion: { ...get().religion, religionName: desc } }),
  hobbies: [],
  setHobbies: (hobbies) => set({ hobbies: hobbies }),
  drinking: '',
  setDrinking: (value) => set({ drinking: value }),
  smoking: undefined,
  setSmoking: (value) => set({ smoking: value }),
  introduction: '',
  setIntroduction: (value) => set({ introduction: value }),
}));
