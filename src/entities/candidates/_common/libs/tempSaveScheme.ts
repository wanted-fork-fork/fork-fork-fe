import { z } from 'zod';

export const tempSaveScheme = z.object({
  myProfile: z.object({}),
  idealPartner: z.object({}),
  expiredAt: z.coerce.date(),
  step: z.coerce.number(),
  myProfileStep: z.coerce.number(),
  idealStep: z.coerce.number(),
});

export type TempFormSave = z.TypeOf<typeof tempSaveScheme>;
