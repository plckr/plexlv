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

export const CommonMediaSchema = z.object({
  ratingKey: z.coerce.number(),
  key: z.string(),
  title: z.string(),
  thumb: z.string().optional(),
  year: z.coerce.number().optional(),
  art: z.string().optional()
});

export const BaseMovieSchema = CommonMediaSchema.extend({
  type: z.literal('movie')
});

// Video
export const MovieSchema = BaseMovieSchema.extend({
  librarySectionTitle: z.string(),
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),

  guid: z.string(),
  studio: z.string().optional(),
  titleSort: z.string().optional(),
  originalTitle: z.string().optional(),
  contentRating: z.string().optional(),
  summary: z.string(),
  audienceRating: z.string().optional(),
  audienceRatingImage: z.string().optional(),
  tagline: z.string().optional(),
  duration: z.coerce.number(),
  originallyAvailableAt: z.string().optional(),
  addedAt: z.string(),
  updatedAt: z.string(),
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
export const BaseShowSchema = CommonMediaSchema.extend({
  type: z.literal('show')
});

export const ShowSchema = BaseShowSchema.extend({
  librarySectionTitle: z.string(),
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),

  index: z.coerce.number(),
  guid: z.string(),
  studio: z.string().optional(),
  titleSort: z.string().optional(),
  originalTitle: z.string().optional(),
  contentRating: z.string().optional(),
  summary: z.string(),
  audienceRating: z.string().optional(),
  audienceRatingImage: z.string().optional(),
  duration: z.coerce.number(),
  leafCount: z.coerce.number(),
  viewedLeafCount: z.coerce.number(),
  childCount: z.coerce.number(),
  originallyAvailableAt: z.string(),
  addedAt: z.string(),
  updatedAt: z.string(),

  Genre: z.array(GenreSchema).optional(),
  Country: z.array(CountrySchema).optional(),
  Role: z.array(RoleSchema).optional(),
  Children: z.array(ChildrenSchema).transform(transformFirstArray).optional()
});
export type Show = z.infer<typeof ShowSchema>;

export const BaseSeasonSchema = CommonMediaSchema.extend({
  type: z.literal('season')
});

export const SeasonSchema = BaseSeasonSchema.extend({
  librarySectionTitle: z.string(),
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),

  parentRatingKey: z.coerce.number(),
  parentKey: z.string(),
  guid: z.string(),
  parentGuid: z.string(),
  parentStudio: z.string().optional(),
  parentTitle: z.string(),
  titleSort: z.string().optional(),
  originalTitle: z.string().optional(),
  summary: z.string(),
  index: z.coerce.number(),
  parentIndex: z.coerce.number(),
  parentThumb: z.string().optional(),
  parentTheme: z.string().optional(),
  leafCount: z.coerce.number(),
  viewedLeafCount: z.coerce.number(),
  addedAt: z.string(),
  updatedAt: z.string()
});
export type Season = z.infer<typeof SeasonSchema>;

export const MediaEntitySchema = z.discriminatedUnion('type', [
  MovieSchema,
  ShowSchema,
  SeasonSchema
]);
export type MediaEntity = z.infer<typeof MediaEntitySchema>;
