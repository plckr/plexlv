import { z } from 'zod';

export const GenreSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Genre = z.infer<typeof GenreSchema>;
