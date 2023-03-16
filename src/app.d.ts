// See https://kit.svelte.dev/docs/types#app

import type { Library, MediaEntity } from '$lib/zod-schemas/plex-api';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      libraries: import('../.svelte-kit/types/src/routes/$types').LayoutData['libraries'];
      library?: Library;
      media?: MediaEntity;
    }
    // interface Platform {}
  }
}

export {};
