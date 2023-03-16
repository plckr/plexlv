import { z } from 'zod';

export const CountrySchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Country = z.infer<typeof CountrySchema>;
