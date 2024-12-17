import { sequence } from '@sveltejs/kit/hooks';

import { lang, title } from '$lib/hooks';

export const handle = sequence(title, lang);
