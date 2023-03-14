import { getInternalUrl } from '$lib/data';
import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { ratingKey } = params;

  try {
    const video = await Plex.getMedia(+ratingKey);

    return { video, art: getInternalUrl('image', { type: 'art', key: ratingKey }) };
  } catch {
    throw error(404);
  }
};
