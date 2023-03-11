import type { IconOptions } from '$components/ui/icon.svelte';

export const getRatingIcon = (str: string): IconOptions | undefined => {
  switch (str) {
    case 'rottentomatoes://image.review.fresh':
      return 'rating-rotten-tomatoes-fresh';
    case 'rottentomatoes://image.review.rotten':
      return 'rating-rotten-tomatoes-rotten';
    default:
      return;
  }
};
