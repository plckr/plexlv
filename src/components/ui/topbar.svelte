<script lang="ts">
  import { sidebarCheckboxId } from '$lib/constants';
  import { localState } from '$lib/stores';
  import Icon from './icon.svelte';
</script>

<aside>
  <label class="hamburger-menu" role="button" for={sidebarCheckboxId} tabindex="0">
    <Icon icon="hamburger" height="24px" width="24px" />
  </label>

  <Icon icon="plex" height="24px" />

  <div class="range">
    <input type="range" min="1" max="100" bind:value={$localState.scaleMultiplier} />
    <Icon icon="grid" />
  </div>
</aside>

<style lang="postcss">
  aside {
    position: relative;

    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr auto 1fr;
    gap: 16px;
    flex-grow: 1;

    height: 48px;

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

    width: 48px;

    color: hsla(0, 0%, 100%, 0.7);
    transition: color 0.2s;
    cursor: pointer;

    @media --hover {
      &:hover {
        color: white;
      }
    }
  }

  .range {
    display: flex;
    gap: 16px;
    justify-self: flex-end;

    color: hsla(0, 0%, 100%, 0.7);
    padding: 12px;
  }

  input[type='range'] {
    width: 60px;
    height: 24px;
  }
</style>
