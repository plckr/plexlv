<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';

  export let name: HTMLSelectAttributes['name'] = undefined;
  export let required: HTMLSelectAttributes['required'] = true;
  export let disabled: HTMLSelectAttributes['disabled'] = undefined;
  export let value: HTMLSelectAttributes['value'] = '';
</script>

<select
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
    @mixin text-regular;

    /* TODO: Styling */
  }
</style>
