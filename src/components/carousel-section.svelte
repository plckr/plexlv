<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  import BaseSection from '$components/base-section.svelte';
  import { Icons } from './ui/icons';

  type Props = {
    title: string;
    children: Snippet;
  };

  let { title, children }: Props = $props();

  let carouselEl: HTMLDivElement = $state(null!);

  let scrollPosition = $state(0);
  let scrollAtEnd = $state(false);

  const onScroll = () => {
    scrollPosition = carouselEl.scrollLeft;
    scrollAtEnd = carouselEl.scrollWidth - carouselEl.clientWidth <= scrollPosition;
  };

  const backward = () => {
    carouselEl.scrollTo({
      left: scrollPosition - carouselEl.clientWidth,
      behavior: 'smooth'
    });
  };
  const forward = () => {
    carouselEl.scrollTo({
      left: scrollPosition + carouselEl.clientWidth,
      behavior: 'smooth'
    });
  };

  onMount(onScroll);
</script>

<BaseSection>
  {#snippet header()}
    <h2 {title}>{title}</h2>

    {#if !(scrollPosition <= 0 && scrollAtEnd)}
      <div class="navigate-arrows">
        <button
          aria-label="Página Anterior"
          title="Página Anterior"
          disabled={scrollPosition <= 0}
          onclick={backward}
        >
          <Icons.ChevronLeft width={18} height={18} />
        </button>
        <button
          aria-label="Página Seguinte"
          title="Página Seguinte"
          disabled={scrollAtEnd}
          onclick={forward}
        >
          <Icons.ChevronRight width={18} height={18} />
        </button>
      </div>
    {/if}
  {/snippet}

  <div class="carousel" bind:this={carouselEl} onscroll={onScroll}>
    <div class="carousel-inner">
      {@render children()}
    </div>
  </div>
</BaseSection>

<style lang="postcss">
  h2 {
    white-space: normal;

    @media --md {
      @mixin text-nowrap;
    }
  }

  .navigate-arrows {
    display: none;

    gap: 15px;

    & button {
      color: hsla(0, 0%, 100%, 0.7);
      transition: color 0.2s;
      padding: 6px;

      &:disabled {
        color: hsla(0, 0%, 100%, 0.3);
        opacity: 0.15;
        cursor: not-allowed;
      }

      @media --hover {
        &:hover:not(:disabled) {
          color: white;
        }
      }
    }

    @media --md {
      display: flex;
    }
  }

  .carousel {
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;

    margin: -8px;
    padding: 8px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .carousel-inner {
    width: max-content;
    height: 100%;

    display: flex;
    gap: var(--gap);
  }
</style>
