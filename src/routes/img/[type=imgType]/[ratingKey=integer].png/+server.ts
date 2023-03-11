import { dev } from '$app/environment';
import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const defaultParams = {
  minSize: '1',
  upscale: '1'
};

const ThumbParams = z.object({
  type: z.literal('thumb'),
  ratingKey: z.coerce.number(),
  width: z.coerce.number().lte(500).default(400).transform(String),
  height: z.coerce.number().lte(750).default(600).transform(String)
});

const ThumbLargeParams = z.object({
  type: z.literal('thumb-lg').transform(() => 'thumb' as const),
  ratingKey: z.coerce.number(),
  width: z.coerce.number().default(500).transform(String),
  height: z.coerce.number().default(750).transform(String)
});

const ArtParams = z.object({
  type: z.literal('art'),
  ratingKey: z.coerce.number(),
  width: z.coerce.number().lte(1280).default(1280).transform(String),
  height: z.coerce.number().lte(954).default(954).transform(String),
  opacity: z.coerce.number().default(10).transform(String),
  background: z.string().default('343a3f')
});

const ParamsSchema = z.discriminatedUnion('type', [ThumbParams, ThumbLargeParams, ArtParams]);

export const GET: RequestHandler = async ({ params, request, url }) => {
  const supportsWebp = request.headers.get('Accept')?.includes('image/webp');
  const format = supportsWebp ? 'webp' : 'png';
  const contentType = supportsWebp ? 'image/webp' : 'image/png';

  try {
    const { ratingKey, type, ...transcodeParams } = ParamsSchema.parse({
      ...defaultParams,
      ...params,
      ...Object.fromEntries([...url.searchParams])
    });

    const img = await Plex.getPhoto(+ratingKey, type, {
      ...transcodeParams,
      format
    });

    return new Response(img, {
      headers: {
        'Content-type': contentType,
        'cache-control': dev ? 'max-age=0' : 'public, max-age=3600'
      }
    });
  } catch {
    throw error(404);
  }
};
