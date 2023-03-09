import { dev } from '$app/environment';
import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import { isImgType, type ImgType } from '$params/imgType';
import type { RequestHandler } from './$types';

const transcodeParams: Record<ImgType, object> = {
  thumb: {
    width: '200',
    height: '300',
    minSize: '1',
    upscale: '1'
  },
  'thumb-lg': {
    width: '250',
    height: '375',
    minSize: '1',
    upscale: '1'
  },
  art: {
    width: '1280',
    height: '1125',
    minSize: '1',
    upscale: '1',
    opacity: '10',
    background: '343a3f'
  }
};

export const GET: RequestHandler = async ({ params, request }) => {
  const { ratingKey, type } = params;

  if (!isImgType(type)) {
    throw error(404);
  }

  const supportsWebp = request.headers.get('Accept')?.includes('image/webp');
  const format = supportsWebp ? 'webp' : 'png';
  const contentType = supportsWebp ? 'image/webp' : 'image/png';
  const thumbOrArt = type === 'art' ? 'art' : 'thumb';

  try {
    const img = await Plex.getPhoto(+ratingKey, thumbOrArt, {
      ...transcodeParams[type],
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
