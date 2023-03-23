import { BaseMediaEntity } from './lib/zod-schemas/plex-api/media-entity';
// See https://kit.svelte.dev/docs/types#app

import type { Locales } from '$i18n/i18n-types';
import type { BaseLibrary, Hub, Library, MediaEntity, Related } from '$lib/zod-schemas/plex-api';

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
      recentlyAdded?: Hub[];
      library?: BaseLibrary & { data?: Library; hubs?: Hub[] };
      media?: MediaEntity;
      lazy?: {
        parentChildren?: BaseMediaEntity[];
        children?: BaseMediaEntity[];
        related?: Related;
      };
    }
    // interface Platform {}
  }
}

export {};
