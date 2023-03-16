import { z } from 'zod';

export const WriterSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Writer = z.infer<typeof WriterSchema>;
