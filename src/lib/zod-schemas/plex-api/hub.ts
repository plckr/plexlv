import { z } from 'zod';
import { BaseMovieSchema, BaseShowSchema } from './media-entity';

const BaseHubSchema = z.object({
  hubKey: z.string(),
  key: z.string(),
  title: z.string(),
  hubIdentifier: z.string(),
  context: z.string(),
  size: z.coerce.number(),
  more: z.coerce.number(),
  style: z.string().optional()
});

const MovieHubSchema = BaseHubSchema.extend({
  type: z.literal('movie'),
  Video: z.array(BaseMovieSchema).optional()
});

const ShowHubSchema = BaseHubSchema.extend({
  type: z.literal('show'),
  Directory: z.array(BaseShowSchema).optional()
});

const MixedHubSchema = BaseHubSchema.extend({
  type: z.literal('mixed'),
  Video: z.array(BaseMovieSchema).optional(),
  Directory: z.array(BaseShowSchema).optional()
});

export const HubSchema = z.discriminatedUnion('type', [
  MovieHubSchema,
  ShowHubSchema,
  MixedHubSchema
]);
