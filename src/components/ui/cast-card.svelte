<script lang="ts">
  import { getNameInitials } from '$lib/utils/string';

  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let image:
    | {
        src: string;
        alt: string;
      }
    | undefined = undefined;
  export let href: string | undefined = undefined;

  let id = crypto.randomUUID();
</script>

<article class="cast-card">
  <div class="thumb" tabindex="-1">
    {#if image?.src}
      <img src={image.src} alt={image.alt} loading="lazy" />
    {:else}
      <div class="initials">{getNameInitials(title)}</div>
    {/if}

    {#if href}
      <!--
        svelte-ignore a11y-missing-content

        anchor's size occupies entire thumb but doesn't have any content
      -->
      <a {href} {title} aria-labelledby={id} />
    {/if}
  </div>
  <div class="info">
    {#if href}
      <a {id} class="title" {title} {href}>
        {title}
      </a>
    {:else}
      <p {id} class="title" {title}>{title}</p>
    {/if}
    {#if subtitle}
      <p title={subtitle}>{subtitle}</p>
    {/if}
  </div>
</article>

<style lang="postcss">
  article {
    @mixin scale-multiplier 130px, 200px, --size;

    padding: 2px;

    width: var(--size);
  }

  .thumb {
    position: relative;

    width: var(--size);
    height: var(--size);

    border-radius: 50%;

    background-color: rgba(0, 0, 0, 0.45);
    box-shadow: 0 0 4px rgb(0 0 0 / 30%);

    & > * {
      border-radius: 50%;
    }

    & a {
      display: block;
      position: absolute;
      inset: 0;

      @media --hover {
        &:hover {
          box-shadow: 0 0 0 1px #e5a00d, 0 0 4px rgb(0 0 0 / 30%);
        }
      }
    }

    & img {
      width: var(--size);
      height: var(--size);

      object-fit: cover;
      object-position: center;
    }

    & .initials {
      display: flex;
      align-items: center;
      justify-content: center;

      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu,
        Cantarell, Helvetica Neue, sans-serif;

      width: var(--size);
      height: var(--size);

      color: hsla(0, 0%, 100%, 0.15);

      text-align: center;
      font-size: 42px;

      user-select: none;
      cursor: default;
    }
  }

  .info {
    @mixin text-semi;

    text-align: center;
    margin-top: 8px;

    overflow: hidden;

    & > * {
      @mixin text-nowrap;

      padding: 0 4px;
      font-size: 13px;
      line-height: 24px;

      max-width: 100%;
    }

    & .title {
      color: white;
    }

    & a.title {
      display: block;

      @media --hover {
        &:hover {
          text-decoration: underline;
        }
      }
    }

    & p {
      color: hsla(0, 0%, 100%, 0.45);

      cursor: default;
    }
  }
</style>
