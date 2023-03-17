<script lang="ts">
  import { getInternalUrl } from '$lib/data';
  import type { Children } from '$lib/zod-schemas/plex-api/children';
  import BaseSection from './base-section.svelte';
  import MediaCard from './ui/media-card.svelte';

  export let children: Children;
</script>

{#if !!children?.Directory}
  <BaseSection>
    <h2 slot="header">Temporadas</h2>

    <div class="inner">
      {#each children?.Directory as season}
        <MediaCard
          title={season.title}
          badge={season.leafCount}
          subtitle="{season.leafCount} episódios"
          href={getInternalUrl('media', { key: season.ratingKey })}
          image={season.thumb
            ? {
                src: getInternalUrl('image', { type: 'thumb', thumb: season.thumb }),
                alt: ''
              }
            : undefined}
        />
      {/each}
    </div>
  </BaseSection>
{/if}

<style lang="postcss">
  .inner {
    display: flex;
    flex-wrap: wrap;

    padding-inline: var(--margin);
    gap: var(--margin);
  }
</style>
