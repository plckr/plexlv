<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';

  export let name: HTMLSelectAttributes['name'] = undefined;
  export let required: HTMLSelectAttributes['required'] = true;
  export let disabled: HTMLSelectAttributes['disabled'] = undefined;
  export let value: HTMLSelectAttributes['value'] = '';
  export let size: 'md' | 'lg' = 'md';
</script>

<select
  class:size-md={size === 'md'}
  class:size-lg={size === 'lg'}
  {name}
  {required}
  {disabled}
  on:change
  on:click
  on:mouseenter
  on:mouseleave
  on:select
  on:selectionchange
  on:selectstart
  on:focus
  bind:value
>
  <slot />
</select>

<style lang="postcss">
  select {
    @mixin text-semi;

    font-size: 15px;
    color: inherit;
    background: transparent;
    border: none;
    appearance: none;

    cursor: pointer;
    transition: color 0.2s;

    &.size-md {
      padding: 4px 6px;
    }

    &.size-lg {
      padding: 8px 12px;
    }

    @media --hover {
      &:hover {
        color: white;
      }
    }

    & :global(option) {
      color: initial;
    }
  }
</style>
