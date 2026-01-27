import { create } from 'zustand';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';

type MyProfileStepKey = keyof typeof MyProfileStepMeta;

type MyProfileFormProcessStore = {
  currentStepIdx: number;
  touchedSteps: Set<MyProfileStepKey>;
};

type Action = {
  setStepIdx: (stepIdx: number | ((prev: number) => number)) => void;
  addTouchedStep: (step: MyProfileStepKey) => void;
  hasTouchedStep: (step: MyProfileStepKey) => boolean;
};

export const useMyProfileFormProcessStore = create<MyProfileFormProcessStore & Action>((set, get) => ({
  currentStepIdx: 0,
  setStepIdx: (idx: number | ((prev: number) => number)) =>
    set({ currentStepIdx: typeof idx === 'number' ? idx : idx(get().currentStepIdx) }),
  touchedSteps: new Set(),
  addTouchedStep: (step) => set({ touchedSteps: new Set([...get().touchedSteps, step]) }),
  hasTouchedStep: (step) => get().touchedSteps.has(step),
}));
