<script lang="ts">
  import { page } from '$app/stores';
  import MediaEntityCard from '$components/media-entity-card.svelte';
  import PageTopHeader from '$components/page-top-header.svelte';
  import TabButton from '$components/ui/tab-button.svelte';
  import { getInternalUrl, getOgUrl, getSeoTitle } from '$lib/data';
  import { libraries } from '$lib/stores';
  import type { LibraryView } from '$params/libraryView';

  $: library = $libraries.find((lib) => lib.key === +$page.params.key);
  $: libraryView = $page.params.view as LibraryView | undefined;
  $: seoTitle = library ? getSeoTitle(library) : undefined;
</script>

<svelte:head>
  {#if library}
    <title>{seoTitle}</title>

    <meta name="og:title" content={seoTitle} />
    <meta name="og:url" content={$page.url.toString()} />
    <meta name="og:image" content={getOgUrl()} />
  {/if}
</svelte:head>

{#if library}
  <PageTopHeader>
    <a href="/">
      {library.title}
    </a>

    <div class="tabs">
      <TabButton
        href={getInternalUrl('library', { key: library.key })}
        active={libraryView === undefined}
      >
        Recomendado
      </TabButton>
      <TabButton
        href={getInternalUrl('library', { key: library.key, view: 'all' })}
        active={libraryView === 'all'}
      >
        Biblioteca
      </TabButton>
      <TabButton
        href={getInternalUrl('library', { key: library.key, view: 'collections' })}
        active={libraryView === 'collections'}
      >
        Coleções
      </TabButton>
    </div>
  </PageTopHeader>

  <main>
    {#each $page.data.library?.MediaEntity || [] as media (media.ratingKey)}
      <MediaEntityCard {media} />
    {/each}
  </main>
{/if}

<style lang="postcss">
  main {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    @media --xs {
      gap: 16px;
    }

    @media --sm {
      gap: 24px;
    }

    @media --lg {
      gap: 30px;
    }
  }

  .tabs {
    display: flex;
  }
</style>
