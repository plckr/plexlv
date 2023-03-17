import {
  BaseLibrariesSchema,
  HubSchema,
  LibrarySchema,
  MediaEntitySchema,
  RelatedSchema
} from './zod-schemas/plex-api';
import { removeTrailingSlash } from './utils/string';
import { PLEX_HOST, PLEX_TOKEN } from '$env/static/private';
import { xmlParse } from './utils/xml';
import { error } from '@sveltejs/kit';

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
    const container = parsed?.MediaContainer?.[0];

    if (!container) {
      throw error(500);
    }

    return container;
  }

  public async getLibraries() {
    const data = await this.get('library/sections');
    return BaseLibrariesSchema.parse(data.Directory);
  }

  public async getLibraryData(libraryKey: number) {
    const data = await this.get(`library/sections/${libraryKey}/all`);
    return LibrarySchema.parse(data);
  }

  public async getMedia(ratingKey: number) {
    const data = await this.get(`library/metadata/${ratingKey}`, {
      includeReviews: '1',
      includeChildren: '1'
    });

    return MediaEntitySchema.parse([...(data?.Video || []), ...(data?.Directory || [])][0]);
  }

  public async getRelated(ratingKey: number) {
    const data = await this.get(`library/metadata/${ratingKey}/related`, {
      'X-Plex-Container-Start': '0',
      'X-Plex-Container-Size': '24'
    });

    return RelatedSchema.parse(data);
  }

  public async getRecentlyAdded(libraryKey: number) {
    const data = await this.get('hubs/promoted', {
      contentDirectoryID: libraryKey.toString(),
      excludeContinueWatching: '1'
    });

    return HubSchema.parse(data.Hub[0]);
  }
}

const instance = Plex.getInstance();
export { instance as Plex };
