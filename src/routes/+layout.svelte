<script lang="ts">
  import Sidebar from '$components/ui/sidebar.svelte';
  import Topbar from '$components/ui/topbar.svelte';
  import '$styles/index.pcss';
</script>

<div class="bg">
  <div />
</div>
<div class="root">
  <Topbar />
  <Sidebar />
  <main>
    <slot />
  </main>
</div>

<style lang="postcss">
  main {
    position: relative;
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

  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: #3f4245;
  }

  :global(body) {
    background-color: #3f4245;
  }

  .bg > div {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle farthest-side at 0% 100%,
        rgb(47, 47, 47) 0%,
        rgba(47, 47, 47, 0) 100%
      ),
      radial-gradient(
        circle farthest-side at 100% 100%,
        rgb(63, 63, 63) 0%,
        rgba(63, 63, 63, 0) 100%
      ),
      radial-gradient(circle farthest-side at 100% 0%, rgb(76, 76, 76) 0%, rgba(76, 76, 76, 0) 100%),
      radial-gradient(circle farthest-side at 0% 0%, rgb(58, 58, 58) 0%, rgba(58, 58, 58, 0) 100%),
      black;
  }
</style>
