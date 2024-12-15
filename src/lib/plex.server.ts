import { error } from '@sveltejs/kit';
import { z } from 'zod';

import { PLEX_HOST, PLEX_TOKEN } from '$env/static/private';
import type { Locales } from '$i18n/i18n-types';
import { removeTrailingSlash } from './utils/string';
import { xmlParse } from './utils/xml';
import {
  BaseLibrariesSchema,
  BaseMediaEntitySchema,
  HubSchema,
  LibrarySchema,
  MediaEntitySchema,
  RelatedSchema
} from './zod-schemas/plex-api';

class Plex {
  private static _instance: Plex;
  public static getInstance() {
    if (!Plex._instance) {
      Plex._instance = new Plex();
    }
    return Plex._instance;
  }

  public getUrl(endpoint: string | undefined = '', params?: Record<string, string>) {
    const urlParts = [
      removeTrailingSlash(PLEX_HOST),
      '/',
      endpoint,
      `?X-Plex-Token=${PLEX_TOKEN}&`,
      new URLSearchParams(params).toString()
    ];

    return urlParts.join('');
  }

  public async getRaw(endpoint?: string, params?: Record<string, string>) {
    const url = this.getUrl(endpoint, params);

    try {
      const request = await fetch(url);

      if (request.status >= 400) {
        throw new Error(`${request.status}(${request.statusText})`);
      }

      return request;
    } catch (err) {
      console.error(`Error on Plex Request "${url}"`, err);
      throw err;
    }
  }

  public async getPhoto(
    ratingKey: number,
    type: 'thumb' | 'art' = 'thumb',
    params?: Partial<
      Record<
        'width' | 'height' | 'blur' | 'minSize' | 'upscale' | 'opacity' | 'background' | 'format',
        string
      >
    >
  ) {
    const request = await this.getRaw('photo/:/transcode', {
      ...params,
      url: this.getUrl(`library/metadata/${ratingKey}/${type}`)
    });

    return request.body;
  }

  public async get(endpoint?: string, params?: Record<string, string>) {
    const request = await this.getRaw(endpoint, params);
    const data = await request.text();

    const parsed = xmlParse(data);

    const schema = z.object({
      MediaContainer: z.array(z.any())
    });

    const container = schema.safeParse(parsed);
    if (!container.success) {
      throw error(500);
    }

    return container.data.MediaContainer[0];
  }

  public async getLibraries(lang: Locales) {
    const data = await this.get('library/sections', {
      'X-Plex-Language': lang
    });
    return BaseLibrariesSchema.parse(data.MediaEntity);
  }

  public async getLibraryData(libraryKey: number, lang: Locales) {
    const data = await this.get(`library/sections/${libraryKey}/all`, {
      'X-Plex-Language': lang
    });
    return LibrarySchema.parse(data);
  }

  public async getLibraryHubs(libraryKey: number, lang: Locales) {
    const data = await this.get(`hubs/sections/${libraryKey}`, {
      count: '12',
      'X-Plex-Language': lang,
      excludeContinueWatching: '1'
    });
    return HubSchema.array()
      .parse(data.Hub)
      .filter(
        (hub) =>
          !(
            hub.context.includes('inprogress') ||
            hub.context.includes('recentlyviewed') ||
            hub.context.includes('rediscover') ||
            hub.context.includes('topunwatched')
          )
      );
  }

  public async getMedia(ratingKey: number, lang: Locales) {
    const data = await this.get(`library/metadata/${ratingKey}`, {
      includeReviews: '1',
      includeChildren: '1',
      'X-Plex-Language': lang
    });

    return MediaEntitySchema.parse(data.MediaEntity[0]);
  }

  public async getRelated(ratingKey: number, lang: Locales) {
    const data = await this.get(`library/metadata/${ratingKey}/related`, {
      'X-Plex-Container-Start': '0',
      'X-Plex-Container-Size': '16',
      count: '16',
      'X-Plex-Language': lang
    });

    return RelatedSchema.parse(data);
  }

  public async getRecentlyAdded(libraryKey: number, lang: Locales) {
    const data = await this.get('hubs/promoted', {
      contentDirectoryID: libraryKey.toString(),
      excludeContinueWatching: '1',
      count: '16',
      'X-Plex-Language': lang
    });

    return HubSchema.parse(data.Hub[0]);
  }

  public async getChildren(ratingKey: number, lang: Locales) {
    const data = await this.get(`library/metadata/${ratingKey}/children`, {
      'X-Plex-Language': lang,
      excludeAllLeaves: '1'
    });

    return BaseMediaEntitySchema.array().parse(data.MediaEntity);
  }
}

const instance = Plex.getInstance();
export { instance as Plex };
