<script lang="ts">
  import LL from '$i18n/i18n-svelte';
  import type { Children } from '$lib/zod-schemas/plex-api/children';
  import BaseSection from './base-section.svelte';
  import MediaEntityCard from './media-entity-card.svelte';

  export let children: Children;
</script>

{#if !!children?.MediaEntity}
  <BaseSection>
    <h2 slot="header">{$LL.seasons()}</h2>

    <div class="inner">
      {#each children?.MediaEntity as season}
        <MediaEntityCard media={season} />
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
