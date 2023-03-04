<script lang="ts">
  import { page } from '$app/stores';
  import MediaCard from '$components/ui/media-card.svelte';
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
  {#if $page.data?.media?.data}
    {#each $page.data.media.data as media (media.ratingKey)}
      <MediaCard
        title={media.title}
        subtitle={media.year}
        badge="39"
        href="{$page.url.pathname}/{media.ratingKey}"
        image={{
          src: `/img/thumb/${media.ratingKey}.png`,
          alt: ''
        }}
      />
    {/each}
  {/if}
</main>

<style lang="postcss">
  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 30px;
  }
</style>
