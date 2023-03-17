<script lang="ts">
  import { page } from '$app/stores';
  import MediaCard from '$components/ui/media-card.svelte';
  import { getInternalUrl } from '$lib/data';
  import { libraries } from '$lib/stores';

  $: library = $libraries.find((lib) => lib.key === +$page.params.key);
</script>

<svelte:head>
  {#if library}
    <title>{library.title} • Plexlv</title>

    <meta name="og:url" content={$page.url.toString()} />
    <meta name="og:title" content={library.title} />
  {/if}
</svelte:head>

<main>
  {#each $page.data.library?.MediaEntity || [] as media (media.ratingKey)}
    <MediaCard
      title={media.title}
      subtitle={media.year?.toString() || ''}
      badge={media.type === 'show' ? media.leafCount : undefined}
      href={getInternalUrl('media', { key: media.ratingKey })}
      image={media.thumb
        ? {
            src: getInternalUrl('image', { type: 'thumb', thumb: media.thumb }),
            alt: ''
          }
        : undefined}
    />
  {/each}
</main>

<style lang="postcss">
  main {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    @media --sm {
      gap: 24px;
    }

    @media --lg {
      gap: 30px;
    }
  }
</style>
