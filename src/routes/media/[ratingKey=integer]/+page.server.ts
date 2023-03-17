import { getInternalUrl } from '$lib/data';
import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
  const { ratingKey } = params;

  try {
    const media = await Plex.getMedia(+ratingKey);
    const art = media.art ? getInternalUrl('image', { type: 'art', thumb: media.art }) : undefined;

    return {
      media,
      art,
      lazy: {
        related: Plex.getRelated(+ratingKey)
      }
    };
  } catch (err) {
    console.error(`Error 404 -> Pathname: ${url.pathname}`, err);
    throw error(404);
  }
};
