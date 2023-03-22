import type { ParamMatcher } from '@sveltejs/kit';

const types = ['all', 'collections'] as const;
export type LibraryView = (typeof types)[number];

export const isImgType = (param: string): param is LibraryView => {
  return (types as ReadonlyArray<string>).includes(param);
};

export const match = ((param) => {
  return isImgType(param);
}) satisfies ParamMatcher;
