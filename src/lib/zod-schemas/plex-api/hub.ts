import { z } from 'zod';
import {
  BaseEpisodeSchema,
  BaseMovieSchema,
  BaseSeasonSchema,
  BaseShowSchema
} from './media-entity';

const BaseHubSchema = z.object({
  hubKey: z.string().optional(),
  key: z.string(),
  title: z.string(),
  hubIdentifier: z.string(),
  context: z.string(),
  size: z.coerce.number(),
  more: z.coerce.number().transform(Boolean),
  promoted: z.coerce.number().transform(Boolean).optional(),
  style: z.string().optional()
});

const MovieHubSchema = BaseHubSchema.extend({
  type: z.literal('movie'),
  MediaEntity: z.array(BaseMovieSchema).optional()
});

const ShowHubSchema = BaseHubSchema.extend({
  type: z.literal('show'),
  MediaEntity: z.array(BaseShowSchema).optional()
});

const SeasonHubSchema = BaseHubSchema.extend({
  type: z.literal('season'),
  MediaEntity: z.array(BaseSeasonSchema).optional()
});

const EpisodeHubSchema = BaseHubSchema.extend({
  type: z.literal('episode'),
  MediaEntity: z.array(BaseEpisodeSchema).optional()
});

const MixedHubSchema = BaseHubSchema.extend({
  type: z.literal('mixed'),
  MediaEntity: z
    .array(
      z.discriminatedUnion('type', [
        BaseMovieSchema,
        BaseShowSchema,
        BaseSeasonSchema,
        BaseEpisodeSchema
      ])
    )
    .optional()
    .default([])
});

export const HubSchema = z.discriminatedUnion('type', [
  MovieHubSchema,
  ShowHubSchema,
  SeasonHubSchema,
  EpisodeHubSchema,
  MixedHubSchema
]);
export type Hub = z.infer<typeof HubSchema>;
