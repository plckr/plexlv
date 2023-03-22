import { getInternalUrl } from '$lib/data';
import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, locals }) => {
  const { ratingKey } = params;

  try {
    const media = await Plex.getMedia(+ratingKey, locals.lang);
    const art = media.art ? getInternalUrl('image', { type: 'art', thumb: media.art }) : undefined;

    return {
      media,
      art,
      lazy: {
        parentChildren:
          media.type === 'season' || media.type === 'episode'
            ? Plex.getChildren(media.parentRatingKey, locals.lang)
            : undefined,
        children: media.type === 'season' ? Plex.getChildren(+ratingKey, locals.lang) : undefined,
        related: Plex.getRelated(+ratingKey, locals.lang)
      }
    };
  } catch (err) {
    console.error(`Error 404 -> Pathname: ${url.pathname}`, err);
    throw error(404);
  }
};
