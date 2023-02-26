// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      libraries: import('../.svelte-kit/types/src/routes/$types').LayoutData['libraries'];
    }
    // interface Platform {}
  }
}

export {};
