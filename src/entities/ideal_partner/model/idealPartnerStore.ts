import { Location } from 'src/entities/location/types/location';
import { ReligionType } from 'src/entities/profile/types/profileSummary';
import { create } from 'zustand';
import { Hobby } from 'src/entities/hobby/types/hobby';
import { createStoreContext } from 'src/shared/functions/createStoreContext';
import { MAX_IDEAL_HEIGHT, MIN_IDEAL_HEIGHT } from 'src/processes/ideal_partner/HeightStyleForm/HeightStyleForm';

export type IdealPartner = {
  ageRange: {
    min: number;
    max: number;
  };
  heightRange: {
    min: number;
    max: number;
  };
  style: string;
  images: File[];
  locations: Location[];
  hobbies: Hobby[];
  religion: {
    religionCategory: ReligionType;
    religionName: string;
  };
  drinking: {
    drinkingCategory: string;
    drinkingAmount: string;
  };
  smoking: {
    smokingCategory: string;
    smokingAmount: string;
  };
  requiredOptions: string[];
  toMatchMaker: string;
};

type Action = {
  setMinAge: (value: number) => void;
  setMaxAge: (value: number) => void;
  setMinHeight: (value: number) => void;
  setMaxHeight: (value: number) => void;
  setStyle: (value: string) => void;
  setImages: (getState: (prevFiles: File[]) => File[]) => void;
  setLocation: (value: Location[]) => void;
  setHobbies: (hobbies: Hobby[]) => void;
  setReligionCategory: (category: ReligionType) => void;
  setReligionName: (name: string) => void;
  setDrinkingCategory: (category: string) => void;
  setDrinkingAmount: (name: string) => void;
  setSmokingCategory: (category: string) => void;
  setSmokingAmount: (name: string) => void;
  setRequiredOptions: (options: string[]) => void;
  setToMatchMaker: (value: string) => void;
};

const createStoreHook = () =>
  create<IdealPartner & Action>((set, get) => ({
    ageRange: {
      min: 20,
      max: 30,
    },
    setMinAge: (min) => set({ ageRange: { ...get().ageRange, min } }),
    setMaxAge: (max) => set({ ageRange: { ...get().ageRange, max } }),
    heightRange: {
      min: MIN_IDEAL_HEIGHT,
      max: MAX_IDEAL_HEIGHT,
    },
    setMinHeight: (min) => set({ heightRange: { ...get().heightRange, min } }),
    setMaxHeight: (max) => set({ heightRange: { ...get().heightRange, max } }),
    style: '',
    setStyle: (style) => set({ style }),
    images: [],
    setImages: (getState) => set({ images: getState(get().images) }),
    locations: [],
    setLocation: (locations) => set({ locations }),
    hobbies: [],
    setHobbies: (hobbies) => set({ hobbies }),
    religion: {
      religionCategory: 'NONE',
      religionName: '',
    },
    setReligionCategory: (religion) => set({ religion: { ...get().religion, religionCategory: religion } }),
    setReligionName: (desc) => set({ religion: { ...get().religion, religionName: desc } }),
    drinking: {
      drinkingCategory: '',
      drinkingAmount: '',
    },
    setDrinkingCategory: (drinking) => set({ drinking: { ...get().drinking, drinkingCategory: drinking } }),
    setDrinkingAmount: (amount) => set({ drinking: { ...get().drinking, drinkingAmount: amount } }),
    smoking: {
      smokingCategory: '',
      smokingAmount: '',
    },
    setSmokingCategory: (smoking) => set({ smoking: { ...get().smoking, smokingCategory: smoking } }),
    setSmokingAmount: (amount) => set({ smoking: { ...get().smoking, smokingAmount: amount } }),
    requiredOptions: [],
    setRequiredOptions: (requiredOptions) => set({ requiredOptions }),
    toMatchMaker: '',
    setToMatchMaker: (toMatchMaker) => set({ toMatchMaker }),
  }));

export const [IdealPartnerProvider, useIdealPartnerStore] = createStoreContext<IdealPartner & Action>(createStoreHook);
