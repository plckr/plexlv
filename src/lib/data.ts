import type { IconOptions } from '$components/ui/icon.svelte';
import type { Locales } from '$i18n/i18n-types';
import { baseLocale, locales } from '$i18n/i18n-util';
import type { ImgType } from '$params/imgType';
import { isArray } from './utils/array';

export const getRatingIcon = (str: string): IconOptions | undefined => {
  if (str.startsWith('imdb://')) return 'imdb';
  if (str.startsWith('themoviedb://')) return 'tmdb';
  if (str.startsWith('thetvdb://')) return 'tvdb';

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
  if ((icon === 'tmdb' || icon === 'tvdb') && !isNaN(+rating)) {
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

export const getContentRating = (rating: string) => {
  // Tries to remove country before rating
  return rating.replace(/^[a-z]{2}[/]/, '');
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

export const isValidLocale = (lang: unknown): lang is Locales => {
  return locales.some((loc) => loc === lang);
};

export const getValidLocale = <L extends string | null | undefined>(
  lang: L | L[],
  fallback?: Locales
): Locales => {
  if (isArray(lang)) {
    const language = lang.find((lang) => isValidLocale(lang)) as Locales | undefined;

    return language || fallback || baseLocale;
  }

  return isValidLocale(lang) ? lang : fallback || baseLocale;
};
