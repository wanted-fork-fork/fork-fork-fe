import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';

export type MetaKey = keyof typeof MyProfileStepMeta | keyof typeof IdealPartnerStepMeta;

export const getStepFromFormMeta = (key: MetaKey | null) => {
  if (!key) {
    return null;
  }

  if (key in MyProfileStepMeta) {
    return MyProfileStepMeta[key as keyof typeof MyProfileStepMeta];
  }

  if (key in IdealPartnerStepMeta) {
    return IdealPartnerStepMeta[key as keyof typeof IdealPartnerStepMeta];
  }

  return null;
};
