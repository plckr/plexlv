import { z } from 'zod';

export const DirectorSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Director = z.infer<typeof DirectorSchema>;
