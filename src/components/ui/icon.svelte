<script lang="ts" context="module">
  import activity from './icons/activity.svg?raw';
  import adjust from './icons/adjust.svg?raw';
  import alert from './icons/alert.svg?raw';
  import chevronLeft from './icons/chevron-left.svg?raw';
  import chevronRight from './icons/chevron-right.svg?raw';
  import discover from './icons/discover.svg?raw';
  import grid from './icons/grid.svg?raw';
  import hamburger from './icons/hamburger.svg?raw';
  import home from './icons/home.svg?raw';
  import imdb from './icons/imdb.svg?raw';
  import movie from './icons/movie.svg?raw';
  import music from './icons/music.svg?raw';
  import photo from './icons/photo.svg?raw';
  import picture from './icons/picture.svg?raw';
  import pin from './icons/pin.svg?raw';
  import play from './icons/play.svg?raw';
  import playerCast from './icons/player-cast.svg?raw';
  import plex from './icons/plex.svg?raw';
  import rating from './icons/rating.svg?raw';
  import rottenTomatoesFresh from './icons/rotten-tomatoes-fresh.svg?raw';
  import rottenTomatoesRotten from './icons/rotten-tomatoes-rotten.svg?raw';
  import search from './icons/search.svg?raw';
  import shuffle from './icons/shuffle.svg?raw';
  import settings from './icons/settings.svg?raw';
  import tmdb from './icons/tmdb.svg?raw';
  import tv from './icons/tv.svg?raw';
  import tvdb from './icons/tvdb.svg?raw';
  import tvshow from './icons/tvshow.svg?raw';
  import verticalDots from './icons/vertical-dots.svg?raw';

  export const icons = {
    activity,
    adjust,
    alert,
    'chevron-left': chevronLeft,
    'chevron-right': chevronRight,
    discover,
    grid,
    hamburger,
    home,
    imdb,
    movie,
    music,
    photo,
    picture,
    pin,
    play,
    'player-cast': playerCast,
    plex,
    rating,
    'rotten-tomatoes-fresh': rottenTomatoesFresh,
    'rotten-tomatoes-rotten': rottenTomatoesRotten,
    search,
    settings,
    shuffle,
    tmdb,
    tv,
    tvdb,
    tvshow,
    'vertical-dots': verticalDots
  };

  export type IconOptions = keyof typeof icons;

  export const isIconVariant = (variant: string | undefined): variant is IconOptions => {
    if (!variant) return false;
    return Object.keys(icons).includes(variant);
  };
</script>

<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };

  export let icon: IconOptions;

  export let width = 'auto';
  export let height = '24px';
</script>

<i
  data-icon={icon}
  class={className}
  aria-hidden="true"
  {...$$restProps}
  style:--width={width}
  style:--height={height}
>
  {@html icons[icon]}
</i>

<style lang="postcss">
  i :global(svg) {
    width: var(--width, auto);
    height: var(--height, auto);
  }
</style>
