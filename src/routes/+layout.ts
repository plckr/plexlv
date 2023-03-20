import type { LayoutLoad } from './$types';
import { setLocale } from '$i18n/i18n-svelte';
import { loadLocaleAsync } from '$i18n/i18n-util.async';

export const load = (async ({ data }) => {
  await loadLocaleAsync(data.lang);

  setLocale(data.lang);

  return data;
}) satisfies LayoutLoad;
