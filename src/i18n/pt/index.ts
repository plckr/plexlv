import type { Translation } from '../i18n-types';

const pt = {
  language: 'Português',
  errorNotFoundTitle: 'Não encontrado',
  errorNotFoundMessage: 'Não conseguimos encontrar a página que queres ver',
  errorDefaultTitle: 'Algo correu mal',
  errorDefaultMessage: 'Ocorreu um erro inesperado',
  home: 'Início',
  goHome: 'Ir para a página inicial',
  mainMenu: 'Menu principal',
  expand: 'Expandir',
  collapse: 'Sucumbir',
  directedBy: 'Realizado por',
  writtenBy: 'Escrito por',
  studio: 'Estúdio',
  genre: 'Género',
  cast: 'Elenco',
  reviews: 'Análises',
  learnMore: 'Sabe mais',
  readLess: 'Ler menos',
  noOfSeasons: '{noOfSeasons} temporada{{s}}',
  seasons: 'Temporadas',
  seasonNo: 'Temporada {index}',
  noOfEpisodes: '{noOfEpisodes} episódio{{s}}',
  episodeNo: 'Episódio {index}',
  released: 'Lançado',
  video: 'Video',
  audio: 'Áudio',
  subtitles: 'Legendas',
  recommended: 'Recomendado',
  library: 'Biblioteca',
  collections: 'Coleções'
} satisfies Translation;

export default pt;
