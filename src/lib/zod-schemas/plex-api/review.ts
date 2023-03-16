import { z } from 'zod';

export const ReviewSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string(),
  text: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  source: z.string()
});
export type Review = z.infer<typeof ReviewSchema>;
