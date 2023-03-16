import { z } from 'zod';
import { BaseMovieSchema } from './media-entity';

export const HubSchema = z.object({
  hubKey: z.string(),
  key: z.string(),
  title: z.string(),
  type: z.literal('movie'),
  hubIdentifier: z.string(),
  context: z.string(),
  size: z.coerce.number(),
  more: z.coerce.number(),
  style: z.string().optional(),

  Video: z.array(BaseMovieSchema).optional()
});
