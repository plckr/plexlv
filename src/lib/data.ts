import type { IconOptions } from '$components/ui/icon.svelte';
import type { ImgType } from '$params/imgType';

export const getRatingIcon = (str: string): IconOptions | undefined => {
  switch (str) {
    case 'rottentomatoes://image.review.fresh':
      return 'rating-rotten-tomatoes-fresh';
    case 'rottentomatoes://image.review.rotten':
      return 'rating-rotten-tomatoes-rotten';
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

export const getInternalUrl = <T extends keyof UrlTypeParams>(
  type: T,
  params: UrlTypeParams[T]
): string => {
  switch (type) {
    case 'library':
      return `/library/${params.key}`;
    case 'media':
      return `/media/${params.key}`;
    case 'image':
      // TODO: if possible, find a way to remove the error without the `as`
      return `/img/${(params as UrlTypeParams['image']).type}/${params.key}.png`;
    default:
      return '';
  }
};
