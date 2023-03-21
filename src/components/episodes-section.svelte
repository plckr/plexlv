<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import type { BaseEpisode, BaseMediaEntity } from '$lib/zod-schemas/plex-api';
  import BaseSection from './base-section.svelte';
  import EpisodeWideCard from './episode-wide-card.svelte';

  export let media: BaseMediaEntity[];

  $: episodes = media.filter((media) => media.type === 'episode') as BaseEpisode[];
</script>

{#if !!episodes.length}
  <BaseSection>
    <h2 slot="header">
      {$LL.noOfEpisodes({
        noOfEpisodes: episodes.length
      })}
    </h2>

    <div class="inner">
      {#each episodes as episode}
        <EpisodeWideCard media={episode} />
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
