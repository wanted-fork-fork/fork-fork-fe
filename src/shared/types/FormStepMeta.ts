import { ReactElement, ReactNode } from 'react';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';

export type StepMeta = {
  title: ({ name }: { name: string }) => ReactNode;
  description?: () => ReactNode;
  form: ReactElement;
  canGoNext: (state: MyProfile) => boolean;
};
