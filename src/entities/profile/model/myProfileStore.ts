import { create } from 'zustand';
import { Gender, JobType, Location, ReligionType } from 'src/entities/profile/types/profileSummary';
import { Hobby } from 'src/processes/my_profile/HobbyForm/HobbyForm';
import { DateObj } from 'src/shared/vo/date';
import { Mbti } from 'src/shared/vo/mbti';

export type MyProfile = {
  name: string;
  gender?: Gender;
  birthDate: Partial<DateObj>;
  height?: number;
  selfImages: File[];
  mbti?: Mbti | null;
  job: {
    type: JobType | null;
    description: string;
  };
  location: Location[];
  religion: {
    type?: ReligionType;
    description?: string;
  };
  hobby: Hobby[];
  alcohol: string;
  smoking?: 'YES' | 'NO' | string;
  introduce: string;
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
  selfImages: [],
  setSelfImages: (getState) => set({ selfImages: getState(get().selfImages) }),
  mbti: undefined,
  setMbti: (mbti) => set({ mbti }),
  job: {
    type: null,
    description: '',
  },
  setJobType: (job) => set({ job: { ...get().job, type: job } }),
  setJobDescription: (desc) => set({ job: { ...get().job, description: desc } }),
  location: [],
  setLocation: (locations) => set({ location: locations }),
  religion: {
    type: undefined,
    description: '',
  },
  setReligionType: (religion) => set({ ...get().religion, religion: { type: religion } }),
  setReligionDescription: (desc) => set({ ...get().religion, religion: { description: desc } }),
  hobby: [],
  setHobbies: (hobbies) => set({ hobby: hobbies }),
  alcohol: '',
  setAlcohol: (value) => set({ alcohol: value }),
  smoking: undefined,
  setSmoking: (value) => set({ smoking: value }),
  introduce: '',
  setIntroduce: (value) => set({ introduce: value }),
}));
