import { z } from 'zod';

export const ProducerSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Producer = z.infer<typeof ProducerSchema>;
