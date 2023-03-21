import { z } from 'zod';
import { BaseShowSchema, BaseMovieSchema } from './media-entity';

export const BaseLibrarySchema = z.object({
  key: z.coerce.number(),
  type: z.union([z.literal('movie'), z.literal('show'), z.literal('photo'), z.literal('artist')]),
  title: z.string(),
  language: z.string(),
  agent: z.string(),
  scanner: z.string(),
  uuid: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  scannedAt: z.string(),
  hidden: z.coerce.number().transform(Boolean)
});
export type BaseLibrary = z.infer<typeof BaseLibrarySchema>;

export const BaseLibrariesSchema = z.array(BaseLibrarySchema);
export type BaseLibraries = z.infer<typeof BaseLibrariesSchema>;

export const LibrarySchema = z.object({
  size: z.coerce.number(),
  allowSync: z.string(),
  art: z.string(),
  identifier: z.string(),
  librarySectionID: z.string(),
  librarySectionTitle: z.string(),
  librarySectionUUID: z.string(),
  mediaTagPrefix: z.string(),
  mediaTagVersion: z.string(),
  thumb: z.string(),
  title1: z.string(),
  title2: z.string(),
  viewGroup: z.union([z.literal('movie'), z.literal('show')]),
  viewMode: z.string(),
  MediaEntity: z.array(z.discriminatedUnion('type', [BaseMovieSchema, BaseShowSchema])).optional()
});
export type Library = z.infer<typeof LibrarySchema>;
