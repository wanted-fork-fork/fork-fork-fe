import { create } from 'zustand';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';

type MyProfileStepKey = keyof typeof MyProfileStepMeta;

type MyProfileFormProcessStore = {
  touchedSteps: Set<MyProfileStepKey>;
};

type Action = {
  addTouchedStep: (step: MyProfileStepKey) => void;
  hasTouchedStep: (step: MyProfileStepKey) => boolean;
};

export const useMyProfileFormProcessStore = create<MyProfileFormProcessStore & Action>((set, get) => ({
  touchedSteps: new Set(),
  addTouchedStep: (step) => set({ touchedSteps: new Set([...get().touchedSteps, step]) }),
  hasTouchedStep: (step) => get().touchedSteps.has(step),
}));
