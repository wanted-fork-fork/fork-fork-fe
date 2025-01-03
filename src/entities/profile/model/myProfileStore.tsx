import { create } from 'zustand';
import { Gender } from 'src/entities/profile/types/profileSummary';
import { Location } from 'src/entities/location/types/location';
import { DateObj } from 'src/shared/vo/date';
import { Mbti } from 'src/shared/vo/mbti';
import { Hobby } from 'src/entities/hobby/types/hobby';
import { createStoreContext } from 'src/shared/functions/createStoreContext';
import {
  Book,
  ImageDto,
  JobJobCategory,
  Movie,
  ReligionReligionCategory,
  UserInfoDrinkingDrinkingCategory,
  UserInfoSmokingSmokingCategory,
} from 'src/types';
import { useCallback, useMemo } from 'react';
import { useDataUrlListFromFiles } from 'src/shared/functions/useDataUrlListFromFiles';

export type MyProfile = {
  name: string;
  gender: Gender;
  birthDate: Partial<DateObj>;
  height: number;
  images: File[];
  imageDtoList: ImageDto[];
  mbti: Mbti | null;
  job: {
    jobCategory: JobJobCategory;
    jobName: string;
  };
  location: Location[];
  religion: {
    religionCategory: ReligionReligionCategory;
    religionName?: string;
  };
  hobbies: Hobby[];
  drinking: {
    drinkingCategory: UserInfoDrinkingDrinkingCategory;
    drinkingAmount?: string;
  };
  smoking: {
    smokingCategory: UserInfoSmokingSmokingCategory;
    smokingAmount?: string;
  };
  introduction: string;
  // 추가 질문
  book: Book;
  dateStyle: string[];
  foods: string[];
  movie: Movie;
  pets: string[];
};

type Action = {
  setName: (name: MyProfile['name']) => void;
  setGender: (gender: Gender) => void;
  setBirthYear: (year: number) => void;
  setBirthMonth: (month: number) => void;
  setBirthDate: (date: number) => void;
  setHeight: (height: number) => void;
  setSelfImages: (getState: (prevFiles: File[]) => File[]) => void;
  setImageDtoList: (getState: (prevFiles: ImageDto[]) => ImageDto[]) => void;
  setMbti: (mbti: Mbti | null) => void;
  setJobCategory: (job: JobJobCategory) => void;
  setJobName: (description: string) => void;
  setLocation: (locations: Location[]) => void;
  setReligionCategory: (job: ReligionReligionCategory) => void;
  setReligionName: (description: string) => void;
  setHobbies: (hobbies: Hobby[]) => void;
  setDrinkingCategory: (value: UserInfoDrinkingDrinkingCategory) => void;
  setDrinkingAmount: (value: string) => void;
  setSmokingCategory: (value: UserInfoSmokingSmokingCategory) => void;
  setSmokingAmount: (value: string) => void;
  setIntroduction: (value: string) => void;
  setBookName: (value: string) => void;
  setBookCause: (value: string) => void;
  setMovieName: (value: string) => void;
  setMovieCause: (value: string) => void;
  setDateStyle: (value: string[]) => void;
  setFoods: (value: string[]) => void;
  setPets: (value: string[]) => void;
};

type TouchedStore = {
  touched: Set<keyof MyProfile>;
  addTouched: (key: keyof MyProfile) => void;
};

const createStoreHook = (initialState?: MyProfile) =>
  create<MyProfile & Action & TouchedStore>((set, get) => ({
    name: '',
    setName: (name) => set({ name }),
    gender: 'MALE',
    setGender: (gender) => set({ gender }),
    birthDate: {
      year: undefined,
      month: undefined,
      date: undefined,
    },
    setBirthYear: (year) => set((state) => ({ birthDate: { ...state.birthDate, year } })),
    setBirthMonth: (month) => set((state) => ({ birthDate: { ...state.birthDate, month } })),
    setBirthDate: (date) => set((state) => ({ birthDate: { ...state.birthDate, date } })),
    height: 0,
    setHeight: (height) => set({ height }),
    images: [],
    imageDtoList: [],
    setSelfImages: (getState) => set({ images: getState(get().images) }),
    setImageDtoList: (getState) => set({ imageDtoList: getState(get().imageDtoList) }),
    mbti: null,
    setMbti: (mbti) => set({ mbti }),
    job: {
      jobCategory: 'ETC',
      jobName: '',
    },
    setJobCategory: (job) => set({ job: { ...get().job, jobCategory: job } }),
    setJobName: (desc) => set({ job: { ...get().job, jobName: desc } }),
    location: [],
    setLocation: (locations) => set({ location: locations }),
    religion: {
      religionCategory: 'ETC',
      religionName: '',
    },
    setReligionCategory: (religion) => set({ religion: { ...get().religion, religionCategory: religion } }),
    setReligionName: (desc) => set({ religion: { ...get().religion, religionName: desc } }),
    hobbies: [],
    setHobbies: (hobbies) => set({ hobbies: hobbies }),
    drinking: { drinkingCategory: 'DRINKER', drinkingAmount: '' },
    setDrinkingCategory: (value) => set({ drinking: { ...get().drinking, drinkingCategory: value } }),
    setDrinkingAmount: (value) => set({ drinking: { ...get().drinking, drinkingAmount: value } }),
    smoking: {
      smokingCategory: 'ETC',
      smokingAmount: '',
    },
    setSmokingCategory: (value) => set({ smoking: { ...get().smoking, smokingCategory: value } }),
    setSmokingAmount: (value) => set({ smoking: { ...get().smoking, smokingAmount: value } }),
    introduction: '',
    setIntroduction: (value) => set({ introduction: value }),
    touched: new Set(),
    addTouched: (key) => {
      const newSet = new Set(get().touched);
      newSet.add(key);
      return set({ touched: newSet });
    },
    book: {
      bookName: '',
      cause: '',
    },
    setBookName: (value) => set({ book: { ...get().book, bookName: value } }),
    setBookCause: (value) => set({ book: { ...get().book, cause: value } }),
    movie: {
      movieName: '',
      cause: '',
    },
    setMovieName: (value) => set({ movie: { ...get().movie, movieName: value } }),
    setMovieCause: (value) => set({ movie: { ...get().movie, cause: value } }),
    dateStyle: [],
    setDateStyle: (value) => set({ dateStyle: value }),
    foods: [],
    setFoods: (value) => set({ foods: value }),
    pets: [],
    setPets: (value) => set({ pets: value }),
    ...initialState,
  }));

export const [MyProfileProvider, useMyProfileStore] = createStoreContext<MyProfile, MyProfile & Action>(
  createStoreHook,
);

export const useMyProfileImages = () => {
  const imageFiles = useMyProfileStore((state) => state.images);
  const imageDtoList = useMyProfileStore((state) => state.imageDtoList);

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

export const useRemoveProfileImageDto = () => {
  const setImageFiles = useMyProfileStore((state) => state.setSelfImages);
  const setImageDtoList = useMyProfileStore((state) => state.setImageDtoList);

  return useCallback(
    (targetUrl: string, fileIdx?: number) => {
      setImageFiles((prev) => prev.filter((_, idx) => idx !== fileIdx));
      setImageDtoList((prev) => prev.filter(({ url }) => url !== targetUrl));
    },
    [setImageDtoList, setImageFiles],
  );
};
