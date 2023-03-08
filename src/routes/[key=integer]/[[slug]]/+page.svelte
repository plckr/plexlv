<script lang="ts">
  import { page } from '$app/stores';
  import Background from '$components/Background.svelte';
  import MediaCard from '$components/ui/media-card.svelte';
  import { libraries } from '$lib/stores';

  $: library = $libraries.find((lib) => lib.key === +$page.params.key);

  $: items = [...($page.data.library?.Video || []), ...($page.data.library?.Directory || [])];
</script>

<svelte:head>
  {#if library}
    <title>{library.title} • Plexlv</title>

    <meta name="og:url" content={$page.url.toString()} />
    <meta name="og:title" content={library.title} />
  {/if}
</svelte:head>

<main>
  {#each items as media (media.ratingKey)}
    <MediaCard
      title={media.title}
      subtitle={media.year?.toString() || ''}
      badge={media.type === 'show' ? media.leafCount : undefined}
      href="{$page.url.pathname}/{media.ratingKey}"
      image={media.thumb
        ? {
            src: media.thumb,
            alt: ''
          }
        : undefined}
    />
  {/each}
</main>

<style lang="postcss">
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 30px;
  }
</style>
