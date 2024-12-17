import { error } from '@sveltejs/kit';

import { Plex } from '$lib/plex.server';
import { getLibraryView } from '$params/libraryView';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent, locals }) => {
  const { libraries } = await parent();

  const key = +params.key;

  const library = libraries.find((lib) => lib.key === key);

  if (!library) {
    throw error(404, "Library doesn't exist");
  }

  return {
    library: {
      ...library,
      data:
        params.view === getLibraryView('library')
          ? await Plex.getLibraryData(key, locals.lang)
          : undefined,
      hubs:
        params.view === getLibraryView('recommended')
          ? await Plex.getLibraryHubs(key, locals.lang)
          : undefined
    }
  };
};
