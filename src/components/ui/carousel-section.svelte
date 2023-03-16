<script lang="ts">
  import BaseSection from '$components/base-section.svelte';
  import { onMount } from 'svelte';
  import Icon from './icon.svelte';

  export let title: string;

  let carouselEl: HTMLDivElement;

  let scrollPosition = 0;
  let scrollAtEnd = false;

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
  <svelte:fragment slot="header">
    <h2 title="Elenco">{title}</h2>

    {#if !(scrollPosition <= 0 && scrollAtEnd)}
      <div class="navigate-arrows">
        <button
          aria-label="Página Anterior"
          title="Página Anterior"
          disabled={scrollPosition <= 0}
          on:click={backward}
        >
          <Icon icon="chevron-left" height="18px" width="18px" />
        </button>
        <button
          aria-label="Página Seguinte"
          title="Página Seguinte"
          disabled={scrollAtEnd}
          on:click={forward}
        >
          <Icon icon="chevron-right" height="18px" width="18px" />
        </button>
      </div>
    {/if}
  </svelte:fragment>

  <div class="carousel" bind:this={carouselEl} on:scroll={onScroll}>
    <div class="carousel-inner">
      <slot />
    </div>
  </div>
</BaseSection>

<style lang="postcss">
  .navigate-arrows {
    display: flex;
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
    gap: 40px;

    & > :global(:first-child) {
      margin-left: var(--margin);
    }

    & > :global(:last-child) {
      margin-right: var(--margin);
    }
  }
</style>
