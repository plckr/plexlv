<script lang="ts">
  import { sidebarCheckboxId } from '$lib/constants';
  import Icon from './icon.svelte';
</script>

<aside>
  <label class="hamburger-menu" role="button" for={sidebarCheckboxId} tabindex="0">
    <Icon icon="hamburger" />
  </label>

  <Icon icon="plex" />
</aside>

<style lang="postcss">
  aside {
    position: relative;

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

  .hamburger-menu {
    padding: 12px;

    color: hsla(0, 0%, 100%, 0.7);
    transition: color 0.2s;
    cursor: pointer;

    @media --hover {
      &:hover {
        color: white;
      }
    }
  }
</style>
