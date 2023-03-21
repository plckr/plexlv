import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { lang, title } from '$lib/hooks';

export const handle = sequence(title, lang) satisfies Handle;
