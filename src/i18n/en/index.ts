import type { BaseTranslation } from '../i18n-types';

const en = {
  language: 'English',
  errorNotFoundTitle: 'Not found',
  errorNotFoundMessage: "We can't find the page you're looking for",
  errorDefaultTitle: 'Something went wrong',
  errorDefaultMessage: 'An unexpected error occurred.',
  home: 'Home',
  goHome: 'Go home',
  mainMenu: 'Main menu',
  expand: 'Expand',
  collapse: 'Collapse',
  directedBy: 'Directed by',
  writtenBy: 'Written by',
  studio: 'Studio',
  genre: 'Genre',
  cast: 'Cast',
  reviews: 'Reviews',
  learnMore: 'Learn more',
  readLess: 'Read less',
  noOfSeasons: '{noOfSeasons:number} season{{s}}',
  seasons: 'Seasons',
  seasonNo: 'Season {index:number}',
  noOfEpisodes: '{noOfEpisodes:number} episode{{s}}',
  episodeNo: 'Episode {index:number}',
  released: 'Released',
  video: 'Video',
  audio: 'Audio',
  subtitles: 'Subtitles',
  recommended: 'Recommended',
  library: 'Library',
  collections: 'Collections'
} satisfies BaseTranslation;

export default en;
