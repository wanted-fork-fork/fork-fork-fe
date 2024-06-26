import { create } from 'zustand';
import { Gender, JobType, Location, Mbti, ReligionType } from 'src/entities/profile/types/profileSummary';
import { Hobby } from 'src/processes/my_profile/HobbyForm/HobbyForm';
import { DeepPartial } from 'src/shared/types/DeepPartial';

type MyProfile = {
  name: string;
  gender: Gender;
  birthDate: {
    year: number;
    month: number;
    date: number;
  };
  height: number;
  selfImages: File[];
  mbti: Mbti | null;
  job: {
    type: JobType;
    description: string;
  };
  location: Location[];
  religion: {
    type: ReligionType;
    description?: string;
  };
  hobby: Hobby[];
  alcohol: string;
  smoking: 'YES' | 'NO' | string;
  introduce: string;
};

type Action = {
  setName: (name: MyProfile['name']) => void;
  setGender: (gender: Gender) => void;
  setBirthYear: (year: number) => void;
  setBirthMonth: (month: number) => void;
  setBirthDate: (date: number) => void;
  setHeight: (height: number) => void;
  setSelfImages: (files: File[]) => void;
  setMbti: (mbti: Mbti) => void;
  setJobType: (job: JobType) => void;
  setJobDescription: (description: string) => void;
  setLocation: (locations: Location[]) => void;
  setReligionType: (job: ReligionType) => void;
  setReligionDescription: (description: string) => void;
  setHobbies: (hobbies: Hobby[]) => void;
  setAlcohol: (value: string) => void;
  setSmoking: (value: string) => void;
  setIntroduce: (value: string) => void;
};

export const useMyProfileStore = create<DeepPartial<MyProfile> & Action>((set) => ({
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
  selfImages: [],
  setSelfImages: (files) => set({ selfImages: files }),
  mbti: undefined,
  setMbti: (mbti) => set({ mbti }),
  job: {
    type: undefined,
    description: '',
  },
  setJobType: (job) => set({ job: { type: job } }),
  setJobDescription: (desc) => set({ job: { description: desc } }),
  location: [],
  setLocation: (locations) => set({ location: locations }),
  religion: {
    type: undefined,
    description: '',
  },
  setReligionType: (religion) => set({ religion: { type: religion } }),
  setReligionDescription: (desc) => set({ religion: { description: desc } }),
  hobby: [],
  setHobbies: (hobbies) => set({ hobby: hobbies }),
  alcohol: '',
  setAlcohol: (value) => set({ alcohol: value }),
  smoking: undefined,
  setSmoking: (value) => set({ smoking: value }),
  introduce: '',
  setIntroduce: (value) => set({ introduce: value }),
}));
