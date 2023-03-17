import type { IconOptions } from '$components/ui/icon.svelte';
import type { ImgType } from '$params/imgType';

export const getRatingIcon = (str: string): IconOptions | undefined => {
  if (str.startsWith('imdb://')) return 'imdb';
  if (str.startsWith('themoviedb://')) return 'tmdb';

  switch (str) {
    case 'rottentomatoes://image.review.fresh':
      return 'rotten-tomatoes-fresh';
    case 'rottentomatoes://image.review.rotten':
      return 'rotten-tomatoes-rotten';
    case 'imdb://image.rating':
      return 'imdb';
    default:
      return;
  }
};

export const getAudienceRating = (
  rating: string,
  image: string
): { icon: IconOptions; rating: string } | undefined => {
  const icon = getRatingIcon(image);
  if (!icon) return;

  // TODO: maybe could be more polished the number check
  if (icon === 'tmdb' && !isNaN(+rating)) {
    return {
      icon,
      rating: `${+rating * 10}%`
    };
  }

  return {
    icon,
    rating: rating.toString()
  };
};

type UrlTypeParams = {
  library: { key: string | number };
  media: { key: string | number };
  image: {
    type: ImgType;
  } & (
    | {
        key: string | number;
      }
    | {
        thumb: string;
      }
  );
};
type UrlType = keyof UrlTypeParams;
type GetInternalUrl = (...args: { [K in UrlType]: [K, UrlTypeParams[K]] }[UrlType]) => string;

export const getInternalUrl: GetInternalUrl = (type, params) => {
  switch (type) {
    case 'library':
      return `/library/${params.key}`;
    case 'media':
      return `/media/${params.key}`;
    case 'image': {
      if ('thumb' in params) {
        return `/img/${params.type}/${params.thumb.split('/')[3]}.png`;
      }

      return `/img/${params.type}/${params.key}.png`;
    }
  }
};
