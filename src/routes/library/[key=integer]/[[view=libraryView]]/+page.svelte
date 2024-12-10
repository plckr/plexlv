<script lang="ts">
  import { page } from '$app/stores';
  import CarouselSection from '$components/carousel-section.svelte';
  import MediaEntityCard from '$components/media-entity-card.svelte';
  import PageTopHeader from '$components/page-top-header.svelte';
  import TabButton from '$components/ui/tab-button.svelte';
  import LL from '$i18n/i18n-svelte';
  import { getInternalUrl, getOgUrl, getSeoTitle } from '$lib/data';
  import { getLibraryView, type LibraryView } from '$params/libraryView';

  let library = $derived($page.data.library);
  let libraryView = $derived($page.params.view as LibraryView | undefined);
  let seoTitle = $derived(library ? getSeoTitle(library) : undefined);
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
    <div class="tabs">
      <TabButton
        href={getInternalUrl('library', { key: library.key, view: 'recommended' })}
        active={libraryView === getLibraryView('recommended')}
      >
        {$LL.recommended()}
      </TabButton>
      <TabButton
        href={getInternalUrl('library', { key: library.key, view: 'library' })}
        active={libraryView === getLibraryView('library')}
      >
        {$LL.library()}
      </TabButton>
    </div>
  </PageTopHeader>

  <main>
    {#if !!library.hubs?.length}
      {#each library.hubs as hub (hub.key)}
        {#if !!hub.MediaEntity?.length}
          <CarouselSection title={hub.title}>
            {#each hub.MediaEntity as media (media.ratingKey)}
              <MediaEntityCard {media} />
            {/each}
          </CarouselSection>
        {/if}
      {/each}
    {/if}
  </main>

  {#if library?.data && !!library?.data?.MediaEntity?.length}
    <main class="library">
      {#each library?.data?.MediaEntity as media (media.ratingKey)}
        <MediaEntityCard {media} />
      {/each}
    </main>
  {/if}
{/if}

<style lang="postcss">
  main.library {
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
