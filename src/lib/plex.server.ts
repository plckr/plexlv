import { removeTrailingSlash } from './utils/string';
import { PLEX_HOST, PLEX_TOKEN } from '$env/static/private';
import { xmlParse } from './utils/xml';

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
		try {
			const request = await fetch(this.getUrl(endpoint));
			const data = await request.text();

			return xmlParse(data);
		} catch (err) {
			console.error('Error on Plex Request', err);
			throw err;
		}
	}
}

const instance = Plex.getInstance();
export { instance as Plex };
