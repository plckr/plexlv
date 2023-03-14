import type { IconOptions } from '$components/ui/icon.svelte';
import type { ImgType } from '$params/imgType';

export const getRatingIcon = (str: string): IconOptions | undefined => {
  switch (str) {
    case 'rottentomatoes://image.review.fresh':
      return 'rating-rotten-tomatoes-fresh';
    case 'rottentomatoes://image.review.rotten':
      return 'rating-rotten-tomatoes-rotten';
    case 'imdb://image.rating':
      return 'imdb';
    default:
      return;
  }
};

type UrlTypeParams = {
  library: { key: string | number };
  media: { key: string | number };
  image: {
    type: ImgType;
    key: string | number;
  };
};
type UrlType = keyof UrlTypeParams;
type GetInternalUrl = (...args: { [K in UrlType]: [K, UrlTypeParams[K]] }[UrlType]) => string;

export const getInternalUrl: GetInternalUrl = (type, params) => {
  switch (type) {
    case 'library':
      return `/library/${params.key}`;
    case 'media':
      return `/media/${params.key}`;
    case 'image':
      return `/img/${params.type}/${params.key}.png`;
  }
};
