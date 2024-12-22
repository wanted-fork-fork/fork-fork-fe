import { Location } from 'src/entities/location/types/location';
import { create } from 'zustand';
import { Hobby } from 'src/entities/hobby/types/hobby';
import { createStoreContext } from 'src/shared/functions/createStoreContext';
import { MAX_IDEAL_HEIGHT, MIN_IDEAL_HEIGHT } from 'src/processes/ideal_partner/HeightStyleForm/HeightStyleForm';
import { DrinkingDrinkingCategory, ImageDto, ReligionReligionCategory, SmokingSmokingCategory } from 'src/types';
import { useDataUrlListFromFiles } from 'src/shared/functions/useDataUrlListFromFiles';
import { useCallback, useMemo } from 'react';

export const REQUIRED_OPTION_MAX_COUNT = 3;

export type IdealPartner = {
  ageRange?: {
    min?: number;
    max?: number;
  };
  heightRange?: {
    min: number;
    max: number;
  };
  style: string;
  images: File[];
  imageDtoList: ImageDto[];
  locations: Location[];
  hobbies: Hobby[];
  religion: {
    religionCategory: ReligionReligionCategory;
    religionName?: string;
  };
  drinking: {
    drinkingCategory: DrinkingDrinkingCategory;
    drinkingAmount?: string;
  };
  smoking: {
    smokingCategory: SmokingSmokingCategory;
    smokingAmount?: string;
  };
  requiredOptions: string[];
  toMatchMaker: string;
};

type Action = {
  toggleAge: (on: boolean) => void;
  setMinAge: (value: number) => void;
  setMaxAge: (value: number) => void;
  setMinHeight: (value: number) => void;
  setMaxHeight: (value: number) => void;
  setStyle: (value: string) => void;
  setImages: (getState: (prevFiles: File[]) => File[]) => void;
  setImageDtoList: (getState: (prevFiles: ImageDto[]) => ImageDto[]) => void;
  setLocation: (value: Location[]) => void;
  setHobbies: (hobbies: Hobby[]) => void;
  setReligionCategory: (category: ReligionReligionCategory) => void;
  setReligionName: (name: string) => void;
  setDrinkingCategory: (category: DrinkingDrinkingCategory) => void;
  setDrinkingAmount: (name: string) => void;
  setSmokingCategory: (category: SmokingSmokingCategory) => void;
  setSmokingAmount: (name: string) => void;
  setRequiredOptions: (options: string[]) => void;
  setToMatchMaker: (value: string) => void;
};

const createStoreHook = (initialState?: IdealPartner) =>
  create<IdealPartner & Action>((set, get) => ({
    ageRange: undefined,
    toggleAge: (on: boolean) => set({ ageRange: on ? { max: undefined, min: undefined } : undefined }),
    setMinAge: (min) => set({ ageRange: { max: 30, ...get().ageRange, min } }),
    setMaxAge: (max) => set({ ageRange: { min: 20, ...get().ageRange, max } }),
    heightRange: {
      min: MIN_IDEAL_HEIGHT,
      max: MAX_IDEAL_HEIGHT,
    },
    setMinHeight: (min) =>
      set({
        heightRange: {
          max: MAX_IDEAL_HEIGHT,
          ...get().heightRange,
          min,
        },
      }),
    setMaxHeight: (max) => set({ heightRange: { min: MIN_IDEAL_HEIGHT, ...get().heightRange, max } }),
    style: '',
    setStyle: (style) => set({ style }),
    images: [],
    imageDtoList: [],
    setImages: (getState) => set({ images: getState(get().images) }),
    setImageDtoList: (getState) => set({ imageDtoList: getState(get().imageDtoList) }),
    locations: [],
    setLocation: (locations) => set({ locations }),
    hobbies: [],
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
