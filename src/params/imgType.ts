import type { ParamMatcher } from '@sveltejs/kit';

const types = ['thumb', 'thumb-lg', 'art', 'og'] as const;
export type ImgType = (typeof types)[number];

export const isImgType = (param: string): param is ImgType => {
  return (types as ReadonlyArray<string>).includes(param);
};

export const match = ((param) => {
  return isImgType(param);
}) satisfies ParamMatcher;
