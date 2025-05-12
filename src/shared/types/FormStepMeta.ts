import { ReactElement, ReactNode } from 'react';

type FormProps = { onClickNextForm?: () => void; extra?: object | null };

export type StepMeta<State> = {
  title: ({ name }: { name: string }) => ReactNode;
  description?: () => ReactNode;
  form: ({ onClickNextForm, extra }: FormProps) => ReactElement<FormProps>;
  canGoNext: (state: State, checkTouched?: (key: string) => boolean) => boolean;
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
