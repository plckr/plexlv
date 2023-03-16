import { z } from 'zod';
import { MediaArt, MediaThumb, MovieSchema, ShowSchema } from './media-entity';

export const BaseLibrarySchema = z.object({
  key: z.coerce.number(),
  type: z.string(),
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
  art: MediaArt,
  identifier: z.string(),
  librarySectionID: z.string(),
  librarySectionTitle: z.string(),
  librarySectionUUID: z.string(),
  mediaTagPrefix: z.string(),
  mediaTagVersion: z.string(),
  thumb: MediaThumb,
  title1: z.string(),
  title2: z.string(),
  viewGroup: z.union([z.literal('movie'), z.literal('show')]),
  viewMode: z.string(),
  Video: z
    .array(
      MovieSchema.pick({
        type: true,
        ratingKey: true,
        title: true,
        titleSort: true,
        year: true,
        thumb: true,
        art: true
      })
    )
    .optional(),
  Directory: z
    .array(
      ShowSchema.pick({
        type: true,
        ratingKey: true,
        title: true,
        titleSort: true,
        year: true,
        thumb: true,
        art: true,
        leafCount: true
      })
    )
    .optional()
});
export type Library = z.infer<typeof LibrarySchema>;
