import type { ParamMatcher } from '@sveltejs/kit';

export type LibraryViewKeys = keyof typeof views;
export type LibraryView = (typeof views)[LibraryViewKeys];

const views = {
  recommended: undefined,
  library: 'all',
  collections: 'collections'
} as const;

const defaultView: LibraryViewKeys = 'recommended';

const types = ['all', 'collections'] as const;

const isLibraryView = (param: string | undefined): param is LibraryView => {
  return (Object.values(types) as ReadonlyArray<string | undefined>).includes(param);
};

export const match = ((param) => {
  return isLibraryView(param);
}) satisfies ParamMatcher;

export const getLibraryView = (view?: LibraryViewKeys) => {
  if (!view) {
    return views[defaultView];
  }
  return views[view];
};
