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

const CommonLibrarySectionKeys = z.object({
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),
  librarySectionTitle: z.string()
});

const CommonBaseMediaSchema = z.object({
  ratingKey: z.coerce.number(),
  key: z.string(),
  title: z.string(),
  thumb: z.string().optional(),
  year: z.coerce.number().optional(),
  art: z.string().optional()
});

export const BaseMovieSchema = CommonBaseMediaSchema.extend({
  type: z.literal('movie')
});

// Video
export const MovieSchema = BaseMovieSchema.merge(CommonLibrarySectionKeys).extend({
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

export const BaseEpisodeSchema = CommonBaseMediaSchema.extend({
  type: z.literal('episode'),

  parentThumb: z.string().optional(),
  grandparentThumb: z.string().optional(),
  grandparentArt: z.string().optional(),
  grandparentTheme: z.string().optional(),

  grandparentTitle: z.string(),
  parentTitle: z.string()
});

export const EpisodeSchema = BaseEpisodeSchema.merge(CommonLibrarySectionKeys).extend({
  parentKey: z.string(),
  grandparentKey: z.string(),

  parentRatingKey: z.coerce.number(),
  grandparentRatingKey: z.coerce.number(),

  guid: z.string(),
  parentGuid: z.string(),
  grandparentGuid: z.string(),

  originalTitle: z.string().optional(),

  parentYear: z.coerce.number().optional(),
  summary: z.string(),
  contentRating: z.string().optional(),
  duration: z.coerce.number(),

  // Episode number
  index: z.coerce.number(),
  parentIndex: z.coerce.number(),

  audienceRating: z.string().optional(),
  audienceRatingImage: z.string().optional(),

  originallyAvailableAt: z.string(),
  addedAt: z.string(),
  updatedAt: z.string()
});

// Directory
export const BaseShowSchema = CommonBaseMediaSchema.extend({
  type: z.literal('show'),
  leafCount: z.coerce.number(),
  childCount: z.coerce.number()
});

export const ShowSchema = BaseShowSchema.merge(CommonLibrarySectionKeys).extend({
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
  viewedLeafCount: z.coerce.number(),
  originallyAvailableAt: z.string(),
  addedAt: z.string(),
  updatedAt: z.string(),

  Genre: z.array(GenreSchema).optional(),
  Country: z.array(CountrySchema).optional(),
  Role: z.array(RoleSchema).optional(),
  Children: z.array(ChildrenSchema).transform(transformFirstArray).optional()
});
export type Show = z.infer<typeof ShowSchema>;

export const BaseSeasonSchema = CommonBaseMediaSchema.extend({
  type: z.literal('season'),
  leafCount: z.coerce.number()
});

export const SeasonSchema = BaseSeasonSchema.merge(CommonLibrarySectionKeys).extend({
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
  viewedLeafCount: z.coerce.number(),
  addedAt: z.string(),
  updatedAt: z.string()
});
export type Season = z.infer<typeof SeasonSchema>;

export const MediaEntitySchema = z.discriminatedUnion('type', [
  MovieSchema,
  ShowSchema,
  SeasonSchema,
  EpisodeSchema
]);
export type MediaEntity = z.infer<typeof MediaEntitySchema>;

export const BaseMediaEntitySchema = z.discriminatedUnion('type', [
  BaseMovieSchema,
  BaseShowSchema,
  BaseSeasonSchema,
  BaseEpisodeSchema
]);
export type BaseMediaEntity = z.infer<typeof BaseMediaEntitySchema>;
