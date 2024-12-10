<script lang="ts">
  type Props = {
    [key: string]: any;
  };

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
