<script lang="ts">
  import { page } from '$app/stores';
  import MediaCard from '$components/ui/media-card.svelte';
</script>

{#each $page.data.media.data as media}
  <MediaCard
    title={media.title}
    subtitle={media.year}
    badge="39"
    href="{$page.url.pathname}/{media.ratingKey}"
  />
{/each}
