import { z } from 'zod';

const MediaThumb = z.string().transform((thumb) => `/img/thumb/${thumb.split('/')[3]}.png`);

const StreamCommonSchema = z.object({
  id: z.coerce.number(),
  selected: z.coerce.number().transform(Boolean).optional(),
  default: z.coerce.number().transform(Boolean).optional(),
  forced: z.coerce.number().transform(Boolean).optional(),
  index: z.coerce.number().optional(),
  codec: z.string(),
  bitrate: z.coerce.number().optional(),

  language: z.string().optional(),
  languageTag: z.string().optional(),
  languageCode: z.string().optional(),

  title: z.string().optional(),
  displayTitle: z.string(),
  extendedDisplayTitle: z.string()
});

// Video
export const StreamType1Schema = StreamCommonSchema.extend({
  streamType: z.literal('1'),

  bitDepth: z.coerce.number(),
  chromaLocation: z.string().optional(),
  chromaSubsampling: z.string(),
  codedHeight: z.coerce.number(),
  codedWidth: z.coerce.number(),
  frameRate: z.string(),
  hasScalingMatrix: z.coerce.number().transform(Boolean).optional(),
  height: z.coerce.number(),
  width: z.coerce.number(),
  level: z.coerce.number().optional(),
  profile: z.string().optional(),
  refFrames: z.coerce.number(),
  scanType: z.string().optional()
});

// Audio
export const StreamType2Schema = StreamCommonSchema.extend({
  streamType: z.literal('2'),

  channels: z.coerce.number(),
  audioChannelLayout: z.string().optional(),
  samplingRate: z.string()
});

// Subtitle
export const StreamType3Schema = StreamCommonSchema.extend({
  streamType: z.literal('3')
});

export const StreamSchema = z.discriminatedUnion('streamType', [
  StreamType1Schema,
  StreamType2Schema,
  StreamType3Schema
]);
export type Stream = z.infer<typeof StreamSchema>;

export const PartSchema = z.object({
  id: z.coerce.number(),
  key: z.string(),
  duration: z.coerce.number(),
  file: z.string().transform((str) => {
    return str.split('/').slice(-1)[0];
  }),
  size: z.coerce.number(),
  container: z.string(),
  audioProfile: z.string().optional(),
  videoProfile: z.string().optional(),
  Stream: z.array(StreamSchema)
});
export type Part = z.infer<typeof PartSchema>;

export const MediaSchema = z.object({
  id: z.coerce.number(),
  duration: z.coerce.number(),
  bitrate: z.coerce.number().optional(),
  width: z.coerce.number(),
  height: z.coerce.number(),
  aspectRatio: z.coerce.number(),
  audioProfile: z.string().optional(),
  audioChannels: z.coerce.number(),
  audioCodec: z.string(),
  videoCodec: z.string(),
  videoResolution: z.string(),
  container: z.string(),
  videoFrameRate: z.string(),
  videoProfile: z.string().optional(),
  Part: z.array(PartSchema)
});
export type Media = z.infer<typeof MediaSchema>;

export const GenreSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Genre = z.infer<typeof GenreSchema>;

export const DirectorSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Director = z.infer<typeof DirectorSchema>;

export const WriterSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Writer = z.infer<typeof WriterSchema>;

export const ProducerSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Producer = z.infer<typeof ProducerSchema>;

export const CountrySchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string()
});
export type Country = z.infer<typeof CountrySchema>;

export const GuidSchema = z.object({
  id: z.string()
});
export type Guid = z.infer<typeof GuidSchema>;

export const RatingSchema = z.object({
  image: z.string(),
  value: z.string(),
  type: z.string()
});
export type Rating = z.infer<typeof RatingSchema>;

export const RoleSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string(),
  tagKey: z.string(),
  role: z.string(),
  thumb: z.string().optional()
});
export type Role = z.infer<typeof RoleSchema>;

export const MovieSchema = z.object({
  ratingKey: z.coerce.number(),
  key: z.string(),
  guid: z.string(),
  studio: z.string().optional(),
  type: z.literal('movie'),
  title: z.string(),
  titleSort: z.string().optional(),
  librarySectionTitle: z.string(),
  librarySectionID: z.coerce.number(),
  librarySectionKey: z.string(),
  originalTitle: z.string().optional(),
  contentRating: z.string().optional(),
  summary: z.string(),
  audienceRating: z.coerce.number().optional(),
  year: z.coerce.number(),
  tagline: z.string().optional(),
  thumb: MediaThumb,
  art: z.string().optional(),
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
  Role: z.array(RoleSchema).optional()
});
export type Movie = z.infer<typeof MovieSchema>;

export const ShowSchema = z.object({
  ratingKey: z.coerce.number(),
  key: z.string(),
  guid: z.string(),
  studio: z.string(),
  type: z.literal('show'),
  title: z.string(),
  titleSort: z.string().optional(),
  originalTitle: z.string(),
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
  Role: z.array(RoleSchema).optional()
});
export type Show = z.infer<typeof ShowSchema>;

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
