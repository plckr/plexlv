<script lang="ts">
  let className = '';
  export { className as class };
</script>

<div class="badge {className}">
  <slot />
</div>

<style lang="postcss">
  .badge {
    @mixin text-semi;

    border-radius: 4px;
    line-height: 22px;
    min-width: 28px;
    padding: 0 6px;
    text-align: center;

    background-color: #e5a00d;
    color: #1f2326;
  }
</style>
