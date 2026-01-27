import { create } from 'zustand';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';

type IdealPartnerStepKey = keyof typeof IdealPartnerStepMeta;

type IdealPartnerFormProcessStore = {
  currentStepIdx: number;
  touchedSteps: Set<IdealPartnerStepKey>;
};

type Action = {
  setStepIdx: (stepIdx: number | ((prev: number) => number)) => void;
  addTouchedStep: (step: IdealPartnerStepKey) => void;
};

export const useIdealPartnerFormProcessStore = create<IdealPartnerFormProcessStore & Action>((set, get) => ({
  currentStepIdx: 0,
  setStepIdx: (idx: number | ((prev: number) => number)) =>
    set({ currentStepIdx: typeof idx === 'number' ? idx : idx(get().currentStepIdx) }),
  touchedSteps: new Set(),
  addTouchedStep: (step) => set({ touchedSteps: new Set([...get().touchedSteps, step]) }),
}));
