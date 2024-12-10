<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLSelectAttributes } from 'svelte/elements';

  type Props = Omit<HTMLSelectAttributes, 'size'> & {
    size?: 'md' | 'lg';
    children?: Snippet;
  };

  let { value = $bindable(''), size = 'md', children, ...rest }: Props = $props();
</script>

<select class:size-md={size === 'md'} class:size-lg={size === 'lg'} {...rest} bind:value>
  {@render children?.()}
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
