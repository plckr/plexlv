// See https://kit.svelte.dev/docs/types#app

import type { Locales } from '$i18n/i18n-types';
import type { Hub, Library, MediaEntity, Related } from '$lib/zod-schemas/plex-api';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      lang: Locales;
    }
    interface PageData {
      lang: Locales;
      libraries: import('../.svelte-kit/types/src/routes/$types').LayoutData['libraries'];
      library?: Library;
      media?: MediaEntity;
      lazy?: {
        recentlyAdded?: Hub[];
        related?: Related;
      };
    }
    // interface Platform {}
  }
}

export {};
