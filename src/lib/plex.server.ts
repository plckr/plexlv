import { removeTrailingSlash } from './utils/string';
import { PLEX_HOST, PLEX_TOKEN } from '$env/static/private';
import { xmlParse } from './utils/xml';

export type PlexLibrary = {
  key: number;
  type: string;
  title: string;
  language: string;
  agent: string;
  scanner: string;
  uuid: string;
  updatedAt: string;
  createdAt: string;
  scannedAt: string;
  hidden: boolean;
};

// TODO
export type PlexMovie = any;

export type PlexLibraryData = {
  size: number;
  data: PlexMovie[];
};

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

    return xmlParse(data);
  }

  public async getLibraries(): Promise<PlexLibrary[]> {
    const data = await this.get('library/sections');

    const libraries: PlexLibrary[] = data.elements[0].elements.map(
      ({
        attributes: {
          key,
          type,
          title,
          language,
          agent,
          scanner,
          uuid,
          updatedAt,
          createdAt,
          scannedAt,
          hidden
        }
      }: any) => ({
        key: +key,
        type,
        title,
        language,
        agent,
        scanner,
        uuid,
        updatedAt,
        createdAt,
        scannedAt,
        hidden: !!+hidden
      })
    );

    return libraries;
  }

  public async getLibraryData(libraryKey: number): Promise<PlexLibraryData> {
    const data = await this.get(`library/sections/${libraryKey}/all`);

    const library = data.elements[0];

    return <PlexLibraryData>{
      size: +library.attributes.size,
      data: data.elements[0].elements.map(({ attributes: media }: any) => media)
    };
  }
}

const instance = Plex.getInstance();
export { instance as Plex };
