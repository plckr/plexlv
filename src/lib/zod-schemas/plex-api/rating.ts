import { z } from 'zod';

export const RatingSchema = z.object({
  image: z.string(),
  value: z.string(),
  type: z.string()
});
export type Rating = z.infer<typeof RatingSchema>;
