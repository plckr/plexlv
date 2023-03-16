import { z } from 'zod';
import { StreamSchema } from './stream';

export const PartSchema = z.object({
  id: z.coerce.number(),
  key: z.string(),
  duration: z.coerce.number(),
  file: z.string().transform((str) => {
    return str.split('/').slice(-1)[0];
  }),
  size: z.coerce.number(),
  container: z.string(),
  audioProfile: z.string().optional(),
  videoProfile: z.string().optional(),
  Stream: z.array(StreamSchema)
});
export type Part = z.infer<typeof PartSchema>;
