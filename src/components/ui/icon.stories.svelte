<script lang="ts" module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import { Icons } from './icons';

  const { Story } = defineMeta({
    title: 'UI/Icons',
    tags: ['autodocs'],
    args: {},
    argTypes: {
      color: { control: 'color' }
    }
  });
</script>

<Story name="Default">
  {#snippet children(args)}
    <div style="display: flex; gap: 8px; color: {args.color};">
      <Icons.Activity />
      <Icons.Adjust />
      <Icons.Alert />
      <Icons.ChevronLeft />
      <Icons.ChevronRight />
      <Icons.Discover />
      <Icons.Grid />
      <Icons.Hamburger />
      <Icons.Home />
      <Icons.Imdb />
      <Icons.Language />
      <Icons.Movie />
      <Icons.Music />
      <Icons.Photo />
      <Icons.Picture />
      <Icons.Pin />
      <Icons.Play />
      <Icons.PlayerCast />
      <Icons.Plex />
      <Icons.Rating />
      <Icons.RottenTomatoesFresh />
      <Icons.RottenTomatoesRotten />
      <Icons.Search />
      <Icons.Settings />
      <Icons.Shuffle />
      <Icons.Tmdb />
      <Icons.Tv />
      <Icons.Tvdb />
      <Icons.Tvshow />
      <Icons.VerticalDots />
    </div>
  {/snippet}
</Story>
