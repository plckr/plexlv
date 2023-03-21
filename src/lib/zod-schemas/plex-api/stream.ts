import { z } from 'zod';

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
  streamType: z.literal('1').transform(() => 'video' as const),

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
  streamType: z.literal('2').transform(() => 'audio' as const),

  channels: z.coerce.number(),
  audioChannelLayout: z.string().optional(),
  samplingRate: z.string()
});

// Subtitle
export const StreamType3Schema = StreamCommonSchema.extend({
  streamType: z.literal('3').transform(() => 'subtitle' as const)
});

export const StreamSchema = z.discriminatedUnion('streamType', [
  StreamType1Schema,
  StreamType2Schema,
  StreamType3Schema
]);
export type Stream = z.infer<typeof StreamSchema>;
