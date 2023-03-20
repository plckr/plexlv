import type { LayoutLoad } from './$types';
import { detectLocale } from '$i18n/i18n-util';
import { setLocale } from '$i18n/i18n-svelte';
import { loadLocaleAsync } from '$i18n/i18n-util.async';

export const load = (async ({ data }) => {
  const locale = detectLocale(() => ['en']);

  await loadLocaleAsync(locale);

  setLocale(locale);

  return data;
}) satisfies LayoutLoad;
