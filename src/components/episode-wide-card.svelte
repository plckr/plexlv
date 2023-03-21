<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import { getInternalUrl } from '$lib/data';
  import type { BaseEpisode } from '$lib/zod-schemas/plex-api';
  import MediaCard from './ui/media-card.svelte';

  export let media: BaseEpisode;
</script>

<MediaCard
  title={media.title}
  subtitle={$LL.episodeNo({ index: media.index })}
  image={media.thumb
    ? {
        src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
        alt: ''
      }
    : undefined}
  href={getInternalUrl('media', { key: media.ratingKey })}
  wide
/>
