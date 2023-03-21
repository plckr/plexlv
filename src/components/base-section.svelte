<section>
  <div class="title-row">
    <slot name="header" />
  </div>

  <slot />
</section>

<style lang="postcss">
  section {
    --gap: 20px;

    @media --md {
      --gap: 40px;
    }

    margin-block: var(--gap);
  }

  .title-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    min-height: 25px;
    max-width: 100%;
    overflow: hidden;

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
