import { Icons, type IconType } from '$components/ui/icons';
import type { Locales } from '$i18n/i18n-types';
import { baseLocale, locales } from '$i18n/i18n-util';
import type { ImgType } from '$params/imgType';
import { getLibraryView, type LibraryViewKeys } from '$params/libraryView';
import { SEO_TITLE_SEPARATOR, SEO_TITLE_SUFFIX } from './constants';
import { isArray } from './utils/array';
import { msToHourMinutes } from './utils/date';
import type { BaseLibrary, MediaEntity, Stream } from './zod-schemas/plex-api';

export const getRatingIcon = (str: string): IconType | undefined => {
  if (str.startsWith('imdb://')) return Icons.Imdb;
  if (str.startsWith('themoviedb://')) return Icons.Tmdb;
  if (str.startsWith('thetvdb://')) return Icons.Tvdb;

  switch (str) {
    case 'rottentomatoes://image.review.fresh':
      return Icons.RottenTomatoesFresh;
    case 'rottentomatoes://image.review.rotten':
      return Icons.RottenTomatoesRotten;
    case 'imdb://image.rating':
      return Icons.Imdb;
    default:
      return;
  }
};

export const getAudienceRating = (
  rating: string,
  image: string
): { icon: IconType; rating: string } | undefined => {
  const icon = getRatingIcon(image);
  if (!icon) return;

  // TODO: maybe could be more polished the number check
  if ((icon === Icons.Tmdb || icon === Icons.Tvdb) && !isNaN(+rating)) {
    return {
      icon,
      rating: `${+rating * 10}%`
    };
  }

  return {
    icon,
    rating
  };
};

export const getContentRating = (rating: string) => {
  // Tries to remove country before rating
  return rating.replace(/^[a-z]{2}[/]/, '');
};

type UrlTypeParams = {
  library: { key: string | number; view?: LibraryViewKeys };
  media: { key: string | number };
  image: {
    type: ImgType;
  } & ({ key: string | number } | { thumb: string });
};
type UrlType = keyof UrlTypeParams;
type GetInternalUrl = (...args: { [K in UrlType]: [K, UrlTypeParams[K]] }[UrlType]) => string;

export const getInternalUrl: GetInternalUrl = (type, params) => {
  switch (type) {
    case 'library': {
      const view = getLibraryView(params.view);
      const routeSuffix = view ? `/${view}` : '';

      return `/library/${params.key}${routeSuffix}`;
    }
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

export const getOgUrl = (art?: string) => {
  if (art) {
    return getInternalUrl('image', {
      type: 'og',
      thumb: art
    });
  }

  // default
  return '/og.png';
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

export const getFormattedDuration = (duration: number) => {
  const durationArray = msToHourMinutes(duration);

  return (durationArray[0] === 1 && durationArray[1] >= 30) || durationArray[0] > 1
    ? `${durationArray[0]} h ${durationArray[1]} min`
    : `${durationArray[2]} min`;
};

export const getStreamTitles = (
  media: MediaEntity
): Record<Stream['streamType'], string | undefined> | undefined => {
  if ('Media' in media && !!media.Media?.length) {
    const streams = media.Media[0].Part[0].Stream;

    return {
      video: streams.find((stream) => stream.streamType === 'video')?.displayTitle,
      audio: streams.find((stream) => stream.streamType === 'audio')?.displayTitle,
      subtitle: streams.find((stream) => stream.streamType === 'subtitle')?.displayTitle
    };
  }

  return undefined;
};

export const getSeoTitle = (input: MediaEntity | BaseLibrary | string) => {
  const suffix = `${SEO_TITLE_SEPARATOR} ${SEO_TITLE_SUFFIX}`;
  if (typeof input === 'string') {
    return `${input} ${suffix}`;
  }

  // is media-entity
  if ('ratingKey' in input) {
    if (input.type === 'season') {
      return `${input.title} - ${input.parentTitle} ${suffix}`;
    } else if (input.type === 'episode') {
      return `${input.title} - ${input.grandparentTitle} ${suffix}`;
    } else if (input.type === 'movie' || input.type === 'show') {
      return `${input.title} ${suffix}`;
    }
  }

  return `${input.title} ${suffix}`;
};
