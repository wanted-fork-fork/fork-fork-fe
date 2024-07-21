import { ReactElement, ReactNode } from 'react';

export type StepMeta<State> = {
  title: ({ name }: { name: string }) => ReactNode;
  description?: () => ReactNode;
  form: ReactElement;
  canGoNext: (state: State) => boolean;
  shortcutTitle: string;
};
