import type { Handle } from '@sveltejs/kit';

import { SEO_TITLE_SUFFIX } from './../constants';

export const title = (async ({ event, resolve }) => {
  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%title%', SEO_TITLE_SUFFIX)
  });
}) satisfies Handle;
