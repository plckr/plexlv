<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'aria-orientation'>;

  let { ...rest }: Props = $props();
</script>

<div aria-orientation="vertical" role="separator" {...rest}></div>

<style lang="postcss">
  div {
    height: 70%;
    width: 1px;
    background: #ffffff1a;
  }
</style>
