<section>
  <div class="title-row">
    <slot name="header" />
  </div>

  <slot />
</section>

<style lang="postcss">
  section {
    --margin: unset;

    @media --lg {
      --margin: 40px;
    }

    margin-block: var(--margin);
  }

  .title-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: 25px;

    padding-inline: var(--margin);

    & :global(h2) {
      @mixin text-bold;

      font-size: clamp(1.125rem, 0.501vw + 0.937rem, 1.313rem);
      line-height: clamp(1.5rem, 1.333vw + 0.999rem, 2rem);
      display: inline-block;
      white-space: nowrap;
      color: white;
    }
  }
</style>
