import { z } from 'zod';
import { MediaThumb } from './media-entity';

const ChildrenDirectory = z.object({
  ratingKey: z.coerce.number(),
  parentRatingKey: z.coerce.number(),
  key: z.string(),
  parentKey: z.string(),
  guid: z.string(),
  parentGuid: z.string(),
  parentStudio: z.string(),
  type: z.literal('season'),
  title: z.string(),
  parentTitle: z.string(),
  titleSort: z.string().optional(),
  originalTitle: z.string().optional(),
  summary: z.string(),
  index: z.coerce.number(),
  parentIndex: z.coerce.number(),
  year: z.string().optional(),
  thumb: z.lazy(() => MediaThumb).optional(),
  parentThumb: z.lazy(() => MediaThumb).optional(),
  art: z.string().optional(),
  parentTheme: z.string().optional(),
  leafCount: z.coerce.number(),
  viewedLeafCount: z.coerce.number(),
  addedAt: z.string(),
  updatedAt: z.string()
});

export const ChildrenSchema = z.object({
  size: z.coerce.number(),
  Directory: z.array(ChildrenDirectory).optional()
});
export type Children = z.infer<typeof ChildrenSchema>;
