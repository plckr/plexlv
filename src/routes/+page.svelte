<script lang="ts">
  import MediaCard from '$components/ui/media-card.svelte';
</script>

<div>
  {#each Array(30) as _}
    <MediaCard title="007 - Alvo em Movimento" subtitle="1985" badge="39" href="/007" />
  {/each}
</div>

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
