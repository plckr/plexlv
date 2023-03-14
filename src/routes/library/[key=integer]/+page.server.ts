import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { libraries } = await parent();

  const key = +params.key;

  const library = libraries.find((lib) => lib.key === key);

  if (!library) {
    throw error(404, "Library doesn't exist");
  }

  const libraryData = await Plex.getLibraryData(key);

  return { library: libraryData };
};
