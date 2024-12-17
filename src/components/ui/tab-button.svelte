<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  type Props = HTMLAnchorAttributes & {
    active?: boolean;
    href: string;
    children: Snippet;
  };

  let { active = false, href, children, ...rest }: Props = $props();
</script>

<a class:active {href} {...rest}>
  {@render children()}
</a>

<style lang="postcss">
  a {
    @mixin text-bold;
    @mixin text-nowrap;

    position: relative;

    margin: 0 5px;
    padding: 0 8px;

    font-size: 0.875rem;
    line-height: 40px;
    user-select: none;

    max-width: 250px;

    color: hsla(0, 0%, 100%, 0.45);

    &,
    &::after {
      transition:
        color 0.2s,
        background-color 0.2s;
    }

    &.active {
      color: #e5a00d;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 4px;
        left: 0;

        height: 2px;

        background-color: #e5a00d;
        border-radius: 1px;
      }
    }

    @media --md {
      padding: 0 16px;
    }

    @media --hover {
      &:hover {
        color: white;

        &::after {
          background-color: white;
        }
      }
    }
  }
</style>
