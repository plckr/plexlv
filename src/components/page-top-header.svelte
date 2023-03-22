<script>
  import { localState } from '$lib/stores';
  import Icon from './ui/icon.svelte';
</script>

<aside>
  <slot />

  <div class="range">
    <input
      type="range"
      min="1"
      max="100"
      bind:value={$localState.scaleMultiplier}
      aria-hidden="true"
    />
    <Icon icon="grid" width="24px" height="24px" />
  </div>
</aside>

<style lang="postcss">
  aside {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > :global(a:first-child) {
      @mixin text-semi;

      display: block;
      color: hsla(0, 0%, 100%, 0.75);
      font-size: 1rem;
      line-height: 1.5rem;
      transition: color 0.2s;
      padding-block: 14px;

      @media --hover {
        &:hover {
          color: white;
        }
      }
    }
  }

  .range {
    display: none;
    gap: 16px;
    justify-self: flex-end;

    color: hsla(0, 0%, 100%, 0.7);
    padding: 12px;

    @media --md {
      display: flex;
    }
  }

  input[type='range'] {
    width: 60px;
    height: 24px;
  }
</style>
