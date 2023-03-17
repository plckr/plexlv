<script>
  import { page } from '$app/stores';
  import CarouselSection from '$components/carousel-section.svelte';
  import MediaCard from '$components/ui/media-card.svelte';
  import { getInternalUrl } from '$lib/data';
</script>

<svelte:head>
  <title>Home • Plexlv</title>

  <meta name="og:url" content={$page.url.toString()} />
  <meta name="og:title" content="Home • Plexlv" />
</svelte:head>

{#await $page.data.lazy.recentlyAdded}
  Loading...
{:then array}
  {#each array as recentlyAdded}
    <CarouselSection title={recentlyAdded.title}>
      {#each recentlyAdded.Video as media (media.ratingKey)}
        <MediaCard
          title={media.title}
          subtitle={media.year}
          image={media.thumb
            ? {
                src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
                alt: ''
              }
            : undefined}
          href={getInternalUrl('media', { key: media.ratingKey })}
        />
      {/each}
    </CarouselSection>
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
