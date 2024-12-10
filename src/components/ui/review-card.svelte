<script lang="ts">
  import Icon, { type IconOptions } from './icon.svelte';

  type Props = {
    title: string;
    subtitle?: string;
    text: string;
    href?: string;
    icon?: IconOptions;
  };

  let { title, subtitle, text, href, icon }: Props = $props();
</script>

<article>
  <div class="top-info">
    {#if icon}
      <div class="logo">
        <Icon {icon} width="40px" height="40px" />
      </div>
    {/if}
    <div class="info">
      {#if href}
        <a {href} class="title" {title} rel="noopener noreferrer" target="_blank">{title}</a>
      {:else}
        <p class="title" {title}>{title}</p>
      {/if}

      <p class="subtitle">{subtitle}</p>
    </div>
  </div>
  <p class="text">{text}</p>
</article>

<style lang="postcss">
  article {
    padding: 20px;

    width: 250px;
    height: 220px;

    @media --md {
      width: 350px;
    }

    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen-Sans,
      Ubuntu,
      Cantarell,
      Helvetica Neue,
      sans-serif;
    font-size: 13px;

    color: white;
    background-color: rgba(0, 0, 0, 0.45);

    box-shadow: 0 0 4px rgb(0 0 0 / 30%);
    border-radius: 4px;
  }

  .top-info {
    display: flex;
    gap: 8px;
  }

  .info {
    cursor: default;

    & > * {
      line-height: 1.85;
    }

    & .subtitle {
      color: hsla(0, 0%, 100%, 0.45);
    }

    @media --hover {
      & a:hover {
        text-decoration: underline;
      }
    }
  }

  .text {
    margin-top: 8px;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    line-height: 1.7;
  }
</style>
