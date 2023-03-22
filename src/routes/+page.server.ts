import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url, locals }) => {
  const { libraries } = await parent();

  try {
    return {
      recentlyAdded: await Promise.all(
        libraries.map((lib) => Plex.getRecentlyAdded(lib.key, locals.lang))
      )
    };
  } catch (err) {
    console.error(`Error 404 -> Pathname: ${url.pathname}`, err);
    throw error(404);
  }
};
