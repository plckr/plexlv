<script>
  import { page } from '$app/stores';
  import CarouselSection from '$components/carousel-section.svelte';
  import MediaEntityCard from '$components/media-entity-card.svelte';
  import LL from '$i18n/i18n-svelte';
  import { getOgUrl, getSeoTitle } from '$lib/data';

  $: seoTitle = getSeoTitle($LL.home());
</script>

<svelte:head>
  <title>{seoTitle}</title>

  <meta name="og:url" content={$page.url.toString()} />
  <meta name="og:title" content={seoTitle} />
  <meta name="og:image" content={getOgUrl()} />
</svelte:head>

{#await $page.data.lazy?.recentlyAdded}
  Loading...
{:then recentlyAdded}
  {#each recentlyAdded || [] as hub}
    {#if 'MediaEntity' in hub && hub.MediaEntity}
      <CarouselSection title={hub.title}>
        {#each hub.MediaEntity as media (media.ratingKey)}
          <MediaEntityCard {media} />
        {/each}
      </CarouselSection>
    {/if}
  {/each}
{/await}

<style lang="postcss">
  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 30px;

    max-height: 100%;
    overflow: auto;

    padding-inline: var(--container-padding);
    margin-inline: calc(var(--container-padding) * -1);
  }
</style>
