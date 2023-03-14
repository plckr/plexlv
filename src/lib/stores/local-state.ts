import { browser } from '$app/environment';
import { localStorageStateKey } from '$lib/constants';
import { localSchema } from '$lib/zod-schemas/local-state';
import { writable } from 'svelte/store';

const getFromLocalStorage = () => {
  if (browser) {
    const initialState = window.localStorage.getItem(localStorageStateKey) || '{}';
    const jsonState = JSON.parse(initialState);

    try {
      const parsed = localSchema.parse(jsonState);
      return parsed;
    } catch {
      // return default state
      return localSchema.parse({});
    }
  }
  return localSchema.parse({});
};

export const localState = writable(getFromLocalStorage());

localState.subscribe(($localState) => {
  if (browser) {
    window.localStorage.setItem(localStorageStateKey, JSON.stringify($localState));
    document.body.style.setProperty('--scale-multiplier', $localState.scaleMultiplier.toString());
  }
});
