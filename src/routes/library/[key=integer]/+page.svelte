<script lang="ts">
  import { page } from '$app/stores';
  import MediaEntityCard from '$components/media-entity-card.svelte';
  import { getSeoTitle } from '$lib/data';
  import { libraries } from '$lib/stores';

  $: library = $libraries.find((lib) => lib.key === +$page.params.key);
  $: seoTitle = library ? getSeoTitle(library) : undefined;
</script>

<svelte:head>
  {#if library}
    <title>{seoTitle}</title>

    <meta name="og:title" content={seoTitle} />
    <meta name="og:url" content={$page.url.toString()} />
  {/if}
</svelte:head>

<main>
  {#each $page.data.library?.MediaEntity || [] as media (media.ratingKey)}
    <MediaEntityCard {media} />
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
