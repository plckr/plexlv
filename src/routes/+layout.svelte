<script lang="ts">
  import { page } from '$app/stores';
  import Background from '$components/Background.svelte';
  import Sidebar from '$components/ui/sidebar.svelte';
  import Topbar from '$components/ui/topbar.svelte';

  import '$styles/index.pcss';

  let { children } = $props();
</script>

<Background />

<div class="root">
  <Topbar />
  <Sidebar />
  {#key $page}
    <main>
      {@render children()}
    </main>
  {/key}
</div>

<style lang="postcss">
  main {
    position: relative;

    height: 100%;
    max-height: 100%;
    overflow: auto;

    padding-inline: var(--container-padding);
    margin-inline: calc(var(--container-padding) * -1);

    & > :global(*) {
      max-width: 100%;
    }
  }

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
</style>
