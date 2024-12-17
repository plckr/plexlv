import { z } from 'zod';

import { BaseSeasonSchema } from './media-entity';

export const ChildrenSchema = z.object({
  size: z.coerce.number(),
  MediaEntity: z.array(z.lazy(() => BaseSeasonSchema)).optional()
});
export type Children = z.infer<typeof ChildrenSchema>;
