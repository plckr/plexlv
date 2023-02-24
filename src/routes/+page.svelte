<script>
  import MediaCard from '$components/ui/media-card.svelte';
  import Sidebar from '$components/ui/sidebar.svelte';
  import Topbar from '$components/ui/topbar.svelte';
</script>

<div class="root">
  <Topbar />

  <Sidebar
    items={[
      {
        title: 'Início',
        icon: 'home',
        href: '/',
        active: true
      },
      {
        title: 'Filmes',
        icon: 'movie',
        href: '/',
        active: false
      },
      {
        title: 'Séries de TV',
        icon: 'tvshow',
        href: '/',
        active: false
      },
      {
        title: 'Filmes crianças',
        icon: 'movie',
        href: '/',
        active: false
      },
      {
        title: 'TV Ao Vivo',
        icon: 'tv',
        href: '/',
        active: false
      }
    ]}
  />

  <main>
    {#each Array(30) as _}
      <MediaCard title="007 - Alvo em Movimento" subtitle="1985" badge="39" href="/007" />
    {/each}
  </main>
</div>

<style lang="postcss">
  .root {
    --container-padding: 8px;

    height: 100vh;
    max-height: 100vh;
    padding: var(--container-padding);

    display: grid;
    grid-template-columns: minmax(52px, auto) 1fr;
    grid-template-rows: auto 1fr;
    column-gap: 24px;
    row-gap: 8px;

    position: relative;
    overflow: hidden;

    & > :global(:first-child) {
      grid-column: span 2;
    }
  }

  main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 30px;

    max-height: 100%;
    overflow: auto;

    padding-inline: var(--container-padding);
    margin-inline: calc(var(--container-padding) * -1);
  }
</style>
