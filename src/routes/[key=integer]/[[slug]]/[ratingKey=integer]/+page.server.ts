import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { ratingKey } = params;

  try {
    const video = await Plex.getMedia(+ratingKey);

    if (video.librarySectionID !== +params.key) {
      throw new Error("Media isn't in specified library");
    }

    return { video, art: `/img/art/${ratingKey}.png` };
  } catch {
    throw error(404);
  }
};
