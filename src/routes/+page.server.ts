import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url }) => {
  const { libraries } = await parent();

  try {
    return {
      lazy: {
        recentlyAdded: Promise.all(libraries.map((lib) => Plex.getRecentlyAdded(lib.key)))
      }
    };
  } catch (err) {
    console.error(`Error 404 -> Pathname: ${url.pathname}`, err);
    throw error(404);
  }
};
