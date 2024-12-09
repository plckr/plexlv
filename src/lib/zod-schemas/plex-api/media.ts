import { z } from 'zod';

import { PartSchema } from './part';

export const MediaSchema = z.object({
  id: z.coerce.number(),
  duration: z.coerce.number(),
  bitrate: z.coerce.number().optional(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  aspectRatio: z.coerce.number(),
  audioProfile: z.string().optional(),
  audioChannels: z.coerce.number(),
  audioCodec: z.string(),
  videoCodec: z.string(),
  videoResolution: z.string(),
  container: z.string(),
  videoFrameRate: z.string().optional(),
  videoProfile: z.string().optional(),
  Part: z.array(PartSchema)
});
export type Media = z.infer<typeof MediaSchema>;
