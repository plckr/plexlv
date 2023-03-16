import { z } from 'zod';
import { SeasonSchema } from './media-entity';

export const ChildrenSchema = z.object({
  size: z.coerce.number(),
  Directory: z
    .array(
      z.lazy(() =>
        SeasonSchema.pick({
          ratingKey: true,
          title: true,
          leafCount: true,
          viewedLeafCount: true,
          thumb: true
        })
      )
    )
    .optional()
});
export type Children = z.infer<typeof ChildrenSchema>;
