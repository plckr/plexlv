<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Home • Plexlv</title>

  <meta name="og:url" content={$page.url.toString()} />
  <meta name="og:title" content="Home • Plexlv" />
</svelte:head>

<div>Home</div>

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
