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
  mbti: undefined,
  job: {
    type: undefined,
    description: '',
  },
  location: [],
  religion: {
    type: undefined,
    description: '',
  },
  hobby: [],
  alcohol: '',
  smoking: undefined,
  introduce: '',
}));
