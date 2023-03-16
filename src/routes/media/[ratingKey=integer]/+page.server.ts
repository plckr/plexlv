import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { ratingKey } = params;

  try {
    const media = await Plex.getMedia(+ratingKey);

    return { media, art: media.art };
  } catch {
    throw error(404);
  }
};
