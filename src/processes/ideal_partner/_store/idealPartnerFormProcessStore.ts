import { create } from 'zustand';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';

type IdealPartnerStepKey = keyof typeof IdealPartnerStepMeta;

type IdealPartnerFormProcessStore = {
  touchedSteps: Set<IdealPartnerStepKey>;
};

type Action = {
  addTouchedStep: (step: IdealPartnerStepKey) => void;
};

export const useIdealPartnerFormProcessStore = create<IdealPartnerFormProcessStore & Action>((set, get) => ({
  touchedSteps: new Set(),
  addTouchedStep: (step) => set({ touchedSteps: new Set([...get().touchedSteps, step]) }),
}));
