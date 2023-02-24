<script lang="ts">
  import { sidebarCheckboxId } from '$lib/constants';
  import Icon from './icon.svelte';
</script>

<aside>
  <label for={sidebarCheckboxId}>
    <Icon icon="hamburger" />
  </label>

  <Icon icon="plex" />
</aside>

<style lang="postcss">
  aside {
    position: relative;
    padding: 12px;

    display: flex;
    align-items: center;
    gap: 16px;
    /* justify-content: space-between; */
    flex-grow: 1;

    font-size: 13px;
    background: #00000099;
    border-radius: 4px;
    z-index: 200;

    & :global(svg) {
      height: 24px;
    }
  }

  label {
    cursor: pointer;
    color: white;
  }
</style>
