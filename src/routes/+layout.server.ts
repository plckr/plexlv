import { env } from '$env/dynamic/private';
import { Plex } from '$lib/plex.server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const libraries = (await Plex.getLibraries())
    // Allow only movies and tvshows
    .filter((lib) => ['movie', 'show'].includes(lib.type))
    // Excluding Keys from .env
    .filter(
      (lib) => !(env?.PLEX_EXCLUDING_LIBRARY_KEYS || '').split(',').includes(lib.key.toString())
    )
    // Sort by key
    .sort((a, b) => a.key - b.key);

  if (!libraries) {
    throw error(404, 'Not found');
  }

  return { libraries };
};
