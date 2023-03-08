<script lang="ts">
  let className = '';
  export { className as class };

  export let variant: 'primary' | 'secondary' = 'primary';
</script>

<div
  class="badge {className}"
  class:badge-primary={variant === 'primary'}
  class:badge-secondary={variant === 'secondary'}
>
  <slot />
</div>

<style lang="postcss">
  .badge {
    @mixin text-semi;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    padding: 0 6px;

    min-width: 28px;
    width: fit-content;

    line-height: 1.5;
    text-align: center;
    white-space: nowrap;

    border-radius: 4px;
  }

  .badge-primary {
    background-color: #e5a00d;
    color: #1f2326;
  }

  .badge-secondary {
    background-color: rgba(0, 0, 0, 0.15);
    color: hsla(0, 0%, 100%, 0.75);
  }
</style>
