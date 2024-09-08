import { ReactElement, ReactNode } from 'react';

type FormProps = { onClickNextForm?: () => void };

export type StepMeta<State> = {
  title: ({ name }: { name: string }) => ReactNode;
  description?: () => ReactNode;
  form: ({ onClickNextForm }: FormProps) => ReactElement<FormProps>;
  canGoNext: (state: State) => boolean;
  /**
   * @default true
   */
  showNextButton?: boolean;
  /**
   * @default true
   */
  showTitle?: boolean;
  shortcutTitle: string;
};
