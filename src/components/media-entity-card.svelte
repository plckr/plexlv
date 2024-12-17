<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import { getInternalUrl } from '$lib/data';
  import type { BaseMediaEntity } from '$lib/zod-schemas/plex-api';
  import MediaCard from './ui/media-card.svelte';

  type Props = {
    media: BaseMediaEntity;
  };

  let { media }: Props = $props();
</script>

{#if media.type === 'movie'}
  <MediaCard
    title={media.title}
    subtitle={media.year?.toString() || ''}
    href={getInternalUrl('media', { key: media.ratingKey })}
    image={media.thumb
      ? {
          src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
          alt: ''
        }
      : undefined}
  />
{/if}

{#if media.type === 'show'}
  <MediaCard
    title={media.title}
    subtitle={$LL.noOfSeasons({ noOfSeasons: media.childCount })}
    badge={media.leafCount}
    href={getInternalUrl('media', { key: media.ratingKey })}
    image={media.thumb
      ? {
          src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
          alt: ''
        }
      : undefined}
  />
{/if}

{#if media.type === 'season'}
  <MediaCard
    title={media.title}
    subtitle={$LL.noOfEpisodes({
      noOfEpisodes: media.leafCount
    })}
    badge={media.leafCount}
    href={getInternalUrl('media', { key: media.ratingKey })}
    image={media.thumb
      ? {
          src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
          alt: ''
        }
      : undefined}
  />
{/if}

{#if media.type === 'episode'}
  <MediaCard
    title={media.grandparentTitle}
    subtitle={media.title}
    href={getInternalUrl('media', { key: media.ratingKey })}
    image={media.grandparentThumb
      ? {
          src: getInternalUrl('image', { type: 'thumb', thumb: media.grandparentThumb }),
          alt: ''
        }
      : undefined}
  />
{/if}
