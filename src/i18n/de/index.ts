import type { Translation } from '../i18n-types';

const de = {
  language: 'Deutsch',
  errorNotFoundTitle: 'Nicht gefunden',
  errorNotFoundMessage: 'Wir können die gesuchte Seite nicht finden',
  errorDefaultTitle: 'Etwas ist schief gelaufen',
  errorDefaultMessage: 'Ein unerwarteter Fehler ist aufgetreten.',
  home: 'Startseite',
  goHome: 'Zur Startseite',
  mainMenu: 'Hauptmenü',
  expand: 'Aufklappen',
  collapse: 'Einklappen',
  directedBy: 'Regie',
  writtenBy: 'Autor',
  studio: 'Studio',
  genre: 'Genre',
  cast: 'Besetzung',
  reviews: 'Rezensionen',
  learnMore: 'Weiterlesen',
  readLess: 'Weniger anzeigen',
  noOfSeasons: '{noOfSeasons} Staffel{{n}}',
  seasons: 'Staffeln',
  seasonNo: 'Staffel {index}',
  noOfEpisodes: '{noOfEpisodes} Folge{{n}}',
  episodeNo: 'Folge {index}',
  released: 'Veröffentlicht',
  video: 'Video',
  audio: 'Ton',
  subtitles: 'Untertitel',
  recommended: 'Empfehlungen',
  library: 'Mediathek',
  collections: 'Sammlungen'
} satisfies Translation;

export default de;
