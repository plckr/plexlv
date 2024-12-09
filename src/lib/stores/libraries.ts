import { derived } from 'svelte/store';

import { page } from '$app/stores';

export const libraries = derived(page, ($page) => $page.data.libraries);
