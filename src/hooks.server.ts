import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { lang } from '$lib/hooks';

export const handle = sequence(lang) satisfies Handle;
