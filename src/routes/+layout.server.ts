import { error } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';
import { Plex } from '$lib/plex.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const libraries = (await Plex.getLibraries(locals.lang))
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

  return { lang: locals.lang, libraries };
};
