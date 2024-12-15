<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import type { BaseMediaEntity } from '$lib/zod-schemas/plex-api';
  import BaseSection from './base-section.svelte';
  import EpisodeWideCard from './episode-wide-card.svelte';

  type Props = {
    media: BaseMediaEntity[];
  };

  let { media }: Props = $props();

  let episodes = $derived(media.filter((media) => media.type === 'episode'));
</script>

{#if !!episodes.length}
  <BaseSection>
    {#snippet header()}
      <h2>
        {$LL.noOfEpisodes({
          noOfEpisodes: episodes.length
        })}
      </h2>
    {/snippet}

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

    gap: var(--gap);
  }
</style>
