import { LANG_COOKIE_KEY, LANG_SEARCH_PARAM_KEY } from '$lib/constants';
import { getValidLocale, isValidLocale } from '$lib/data';
import { redirect, type Handle } from '@sveltejs/kit';

export const lang = (async ({ event, resolve }) => {
  const paramsLang = event.url.searchParams.get(LANG_SEARCH_PARAM_KEY);

  if (paramsLang) {
    if (isValidLocale(paramsLang)) {
      event.cookies.set(LANG_COOKIE_KEY, paramsLang, {
        path: '/'
      });
    }

    event.url.searchParams.delete(LANG_SEARCH_PARAM_KEY);

    const url = `${event.url.pathname}?${event.url.searchParams.toString()}`;

    throw redirect(302, url);
  }

  const lang = getValidLocale([event.cookies.get(LANG_COOKIE_KEY)]);
  event.locals.lang = lang;

  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
}) satisfies Handle;
