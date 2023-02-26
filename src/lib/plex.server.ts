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

  private getUrl(endpoint: string | undefined = '') {
    const urlParts = [removeTrailingSlash(PLEX_HOST), '/', endpoint, `?X-Plex-Token=${PLEX_TOKEN}`];

    return urlParts.join('');
  }

  public async get(endpoint?: string) {
    const url = this.getUrl(endpoint);

    try {
      const request = await fetch(url);
      const data = await request.text();

      return xmlParse(data);
    } catch (err) {
      console.error(`Error on Plex Request "${url}"`, err);
      throw err;
    }
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
