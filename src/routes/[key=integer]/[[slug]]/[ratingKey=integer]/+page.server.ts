import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { ratingKey } = params;

  try {
    const media = await Plex.getMedia(+ratingKey);

    if (media?.librarySectionID !== params.key) {
      throw new Error("Media isn't in specified library");
    }

    return { media, art: `/img/art/${ratingKey}.png` };
  } catch {
    throw error(404);
  }
};
