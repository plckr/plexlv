import type { ParamMatcher } from '@sveltejs/kit';

const types = ['all', 'collections'] as const;
export type LibraryView = (typeof types)[number];

export const isLibraryView = (param: string): param is LibraryView => {
  return (types as ReadonlyArray<string>).includes(param);
};

export const match = ((param) => {
  return isLibraryView(param);
}) satisfies ParamMatcher;
