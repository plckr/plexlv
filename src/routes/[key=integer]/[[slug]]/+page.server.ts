import { Plex } from '$lib/plex.server';
import { slugify } from '$lib/utils/string';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent, url }) => {
  const { libraries } = await parent();

  const key = +params.key;
  const slug = params.slug;

  const library = libraries.find((lib) => lib.key === key);

  if (!library) {
    throw error(404, "Library doesn't exist");
  }

  // Check slug, redirect if not matches
  if (slugify(library.title) !== slug) {
    throw redirect(301, `/${key}/${slugify(library.title)}`);
  }

  const media = await Plex.getLibraryData(key);

  return { media };
};
