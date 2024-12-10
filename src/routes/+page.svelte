<script>
  import { page } from '$app/stores';
  import CarouselSection from '$components/carousel-section.svelte';
  import MediaEntityCard from '$components/media-entity-card.svelte';
  import PageTopHeader from '$components/page-top-header.svelte';
  import LL from '$i18n/i18n-svelte';
  import { getOgUrl, getSeoTitle } from '$lib/data';

  let seoTitle = $derived(getSeoTitle($LL.home()));
</script>

<svelte:head>
  <title>{seoTitle}</title>

  <meta name="og:url" content={$page.url.toString()} />
  <meta name="og:title" content={seoTitle} />
  <meta name="og:image" content={getOgUrl()} />
</svelte:head>

<PageTopHeader />

{#each $page.data.recentlyAdded || [] as hub}
  {#if 'MediaEntity' in hub && hub.MediaEntity}
    <CarouselSection title={hub.title}>
      {#each hub.MediaEntity as media (media.ratingKey)}
        <MediaEntityCard {media} />
      {/each}
    </CarouselSection>
  {/if}
{/each}
