import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const libraries = derived(page, ($page) => $page.data.libraries);
