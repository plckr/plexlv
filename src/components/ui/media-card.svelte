<script lang="ts">
  import { crossfade } from '$lib/actions';
  import Badge from './badge.svelte';

  type Props = {
    class?: string;
    title: string;
    subtitle: string;
    href: string;
    description?: string;
    badge?: string | number;
    image?: { src: string; alt: string };
    wide?: boolean;
  };

  let {
    class: className,
    title,
    subtitle,
    href,
    description,
    badge,
    image,
    wide = false
  }: Props = $props();
</script>

<article class:wide class={className}>
  <div class="card">
    <a {href} {title}>
      {#if image}
        {@const { src, alt } = image}
        <img src="/empty.gif" loading="lazy" {alt} {title} use:crossfade={src} />
      {/if}
    </a>
    {#if badge}
      <Badge class="badge">
        {badge}
      </Badge>
    {/if}
  </div>
  <div class="info">
    <a class="title" {href} {title} tabindex="-1">
      {title}
    </a>
    <p class="subtitle">
      {subtitle}
    </p>
    {#if description}
      <p class="description">
        {description}
      </p>
    {/if}
  </div>
</article>

<style lang="postcss">
  article {
    display: block;

    width: 130px;

    @media --md {
      @mixin scale-multiplier 130px, 200px, width;
    }

    &.wide {
      width: 290px;

      & .card {
        aspect-ratio: 1.8 / 1;
      }

      @media --md {
        @mixin scale-multiplier 290px, 430px, width;
      }
    }
  }

  .card {
    margin-bottom: 8px;
    background-color: rgba(0, 0, 0, 0.45);
    border-radius: 4px;
    box-shadow: 0 0 4px rgb(0 0 0 / 30%);
    position: relative;

    overflow: hidden;
    aspect-ratio: 1 / 1.5;

    & a {
      display: block;
      width: 100%;
      height: 100%;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @media --motion {
        transition: opacity 0.2s;
      }
    }

    & :global(.badge) {
      pointer-events: none;
      position: absolute;
      top: 4px;
      right: 4px;
    }

    @media --hover {
      &:hover {
        border-radius: 4px;
        box-shadow:
          0 0 0 1px #e5a00d,
          0 0 4px rgb(0 0 0 / 30%);

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(30, 30, 30, 0.6);
          pointer-events: none;
          user-select: none;
        }
      }
    }
  }

  .info {
    padding-inline: 4px;
    cursor: default;

    & > * {
      @mixin text-nowrap;

      display: block;
      line-height: 24px;
    }
  }

  .title {
    color: #fff;

    @media --hover {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .subtitle {
    color: hsla(0, 0%, 100%, 0.45);
  }
</style>
