import { create } from 'zustand';
import { createStoreContext } from 'src/shared/functions/createStoreContext';
import {
  IdealPartnerDrinkingDrinkingCategory,
  IdealPartnerRequestHobbies,
  IdealPartnerRequestLocation,
  IdealPartnerSmokingSmokingCategory,
  ImageDto,
  ReligionReligionCategory,
} from 'src/types';
import { useDataUrlListFromFiles } from 'src/shared/functions/useDataUrlListFromFiles';
import { useCallback, useMemo } from 'react';

export const REQUIRED_OPTION_MAX_COUNT = 3;

export type IdealPartner = {
  ageRange?: {
    min?: number;
    max?: number;
  };
  heightRange?: {
    min?: number;
    max?: number;
  };
  style: string;
  images: File[];
  imageDtoList: ImageDto[];
  locations: IdealPartnerRequestLocation;
  hobbies: IdealPartnerRequestHobbies;
  religion: {
    religionCategory: ReligionReligionCategory;
    religionName?: string;
  };
  drinking: {
    drinkingCategory: IdealPartnerDrinkingDrinkingCategory;
    drinkingAmount?: string;
  };
  smoking: {
    smokingCategory: IdealPartnerSmokingSmokingCategory;
    smokingAmount?: string;
  };
  requiredOptions: string[];
  toMatchMaker: string;
};

type Action = {
  toggleAge: (on: boolean) => void;
  setMinAge: (value: number) => void;
  setMaxAge: (value: number) => void;
  toggleHeight: (on: boolean) => void;
  setMinHeight: (value: number) => void;
  setMaxHeight: (value: number) => void;
  setStyle: (value: string) => void;
  setImages: (getState: (prevFiles: File[]) => File[]) => void;
  setImageDtoList: (getState: (prevFiles: ImageDto[]) => ImageDto[]) => void;
  setLocation: (value: IdealPartnerRequestLocation) => void;
  setHobbies: (hobbies: IdealPartnerRequestHobbies) => void;
  setReligionCategory: (category: ReligionReligionCategory) => void;
  setReligionName: (name: string) => void;
  setDrinkingCategory: (category: IdealPartnerDrinkingDrinkingCategory) => void;
  setDrinkingAmount: (name: string) => void;
  setSmokingCategory: (category: IdealPartnerSmokingSmokingCategory) => void;
  setSmokingAmount: (name: string) => void;
  setRequiredOptions: (options: string[]) => void;
  setToMatchMaker: (value: string) => void;
};

const createStoreHook = (initialState?: IdealPartner) =>
  create<IdealPartner & Action>((set, get) => ({
    ageRange: undefined,
    toggleAge: (on: boolean) => set({ ageRange: on ? { max: undefined, min: undefined } : undefined }),
    setMinAge: (min) => set({ ageRange: { ...get().ageRange, min } }),
    setMaxAge: (max) => set({ ageRange: { ...get().ageRange, max } }),
    heightRange: undefined,
    toggleHeight: (on: boolean) => set({ heightRange: on ? { max: undefined, min: undefined } : undefined }),
    setMinHeight: (min) =>
      set({
        heightRange: {
          ...get().heightRange,
          min,
        },
      }),
    setMaxHeight: (max) => set({ heightRange: { ...get().heightRange, max } }),
    style: '',
    setStyle: (style) => set({ style }),
    images: [],
    imageDtoList: [],
    setImages: (getState) => set({ images: getState(get().images) }),
    setImageDtoList: (getState) => set({ imageDtoList: getState(get().imageDtoList) }),
    locations: 'NOT_IMPORTANT',
    setLocation: (locations) => set({ locations }),
    hobbies: 'NOT_IMPORTANT',
    setHobbies: (hobbies) => set({ hobbies }),
    religion: {
      religionCategory: 'ETC',
      religionName: '',
    },
    setReligionCategory: (religion) => set({ religion: { ...get().religion, religionCategory: religion } }),
    setReligionName: (desc) => set({ religion: { ...get().religion, religionName: desc } }),
    drinking: {
      drinkingCategory: 'ETC',
      drinkingAmount: '',
    },
    setDrinkingCategory: (drinking) => set({ drinking: { ...get().drinking, drinkingCategory: drinking } }),
    setDrinkingAmount: (amount) => set({ drinking: { ...get().drinking, drinkingAmount: amount } }),
    smoking: {
      smokingCategory: 'ETC',
      smokingAmount: '',
    },
    setSmokingCategory: (smoking) => set({ smoking: { ...get().smoking, smokingCategory: smoking } }),
    setSmokingAmount: (amount) => set({ smoking: { ...get().smoking, smokingAmount: amount } }),
    requiredOptions: [],
    setRequiredOptions: (requiredOptions) =>
      requiredOptions.length <= REQUIRED_OPTION_MAX_COUNT && set({ requiredOptions }),
    toMatchMaker: '',
    setToMatchMaker: (toMatchMaker) => set({ toMatchMaker }),
    ...initialState,
  }));

export const [IdealPartnerProvider, useIdealPartnerStore] = createStoreContext<IdealPartner, IdealPartner & Action>(
  createStoreHook,
);

export const useIdealPartnerImages = () => {
  const imageFiles = useIdealPartnerStore((state) => state.images);
  const imageDtoList = useIdealPartnerStore((state) => state.imageDtoList);

  const urls = useDataUrlListFromFiles(imageFiles);

  return useMemo(() => {
    return [
      ...imageDtoList,
      ...(urls.filter(Boolean) as string[]).map(
        (url, idx) =>
          ({
            imageId: idx.toString(),
            url,
          }) satisfies ImageDto,
      ),
    ];
  }, [imageDtoList, urls]);
};

export const useRemoveIdealPartnerImageDto = () => {
  const setImageFiles = useIdealPartnerStore((state) => state.setImages);
  const setImageDtoList = useIdealPartnerStore((state) => state.setImageDtoList);

  return useCallback(
    (targetUrl: string, fileIdx?: number) => {
      setImageFiles((prev) => prev.filter((_, idx) => idx !== fileIdx));
      setImageDtoList((prev) => prev.filter(({ url }) => url !== targetUrl));
    },
    [setImageDtoList, setImageFiles],
  );
};
