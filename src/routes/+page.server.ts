import { Plex } from '$lib/plex.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await Plex.get();

	return { data };
};
