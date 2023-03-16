import { getInternalUrl } from '$lib/data';
import { transformFirstArray } from '$lib/utils/zod';
import { z } from 'zod';
import { ChildrenSchema } from './children';
import { CountrySchema } from './country';
import { DirectorSchema } from './director';
import { GenreSchema } from './genre';
import { GuidSchema } from './guid';
import { MediaSchema } from './media';
import { ProducerSchema } from './producer';
import { RatingSchema } from './rating';
import { RelatedSchema } from './related';
import { ReviewSchema } from './review';
import { RoleSchema } from './role';
import { WriterSchema } from './writer';

export const MediaThumb = z
  .string()
  .transform((thumb) => getInternalUrl('image', { type: 'thumb', key: thumb.split('/')[3] }));

export const BaseMovieSchema = z.object({
  ratingKey: z.coerce.number(),
  key: z.string(),
  type: z.literal('movie'),
  title: z.string(),
  thumb: MediaThumb,
  year: z.coerce.number(),
  art: z.string().optional()
});

// Video
export const MovieSchema = BaseMovieSchema.extend({
  guid: z.string(),
  studio: z.string().optional(),
  titleSort: z.string().optional(),
  librarySectionTitle: z.string(),
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),
  originalTitle: z.string().optional(),
  contentRating: z.string().optional(),
  summary: z.string(),
  audienceRating: z.coerce.number().optional(),
  tagline: z.string().optional(),
  duration: z.coerce.number(),
  originallyAvailableAt: z.string().optional(),
  addedAt: z.string(),
  updatedAt: z.string(),
  audienceRatingImage: z.string().optional(),
  chapterSource: z.string().optional(),

  Media: z.array(MediaSchema),
  Genre: z.array(GenreSchema).optional(),
  Director: z.array(DirectorSchema).optional(),
  Writer: z.array(WriterSchema).optional(),
  Producer: z.array(ProducerSchema).optional(),
  Country: z.array(CountrySchema).optional(),
  Guid: z.array(GuidSchema).optional(),
  Rating: z.array(RatingSchema).optional(),
  Role: z.array(RoleSchema).optional(),
  Review: z.array(ReviewSchema).optional(),
  Related: z.array(RelatedSchema).transform(transformFirstArray).optional()
});
export type Movie = z.infer<typeof MovieSchema>;

// Directory
export const ShowSchema = z.object({
  librarySectionTitle: z.string(),
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),

  ratingKey: z.coerce.number(),
  key: z.string(),
  guid: z.string(),
  studio: z.string(),
  type: z.literal('show'),
  title: z.string(),
  titleSort: z.string().optional(),
  originalTitle: z.string().optional(),
  summary: z.string(),
  index: z.string(),
  audienceRating: z.string(),
  year: z.string().optional(),
  thumb: MediaThumb.optional(),
  art: z.string().optional(),
  duration: z.string(),
  originallyAvailableAt: z.string(),
  leafCount: z.string(),
  viewedLeafCount: z.string(),
  childCount: z.string(),
  addedAt: z.string(),
  updatedAt: z.string(),
  audienceRatingImage: z.string(),

  Genre: z.array(GenreSchema).optional(),
  Country: z.array(CountrySchema).optional(),
  Role: z.array(RoleSchema).optional(),
  Children: z.array(ChildrenSchema).transform(transformFirstArray).optional()
});
export type Show = z.infer<typeof ShowSchema>;

export const MediaEntitySchema = z.discriminatedUnion('type', [MovieSchema, ShowSchema]);
export type MediaEntity = z.infer<typeof MediaEntitySchema>;
