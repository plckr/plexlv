import { z } from 'zod';

export const localSchema = z
  .object({
    scaleMultiplier: z.coerce.number().gte(1).lte(100).default(50)
  })
  .default({});
export type LocalState = z.infer<typeof localSchema>;
