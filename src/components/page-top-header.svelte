<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getInternalUrl } from '$lib/data';
  import { localState } from '$lib/stores';
  import Divider from './ui/divider.svelte';
  import Icon from './ui/icon.svelte';
  import Loading from './ui/loading.svelte';
  import Select from './ui/select.svelte';

  const onSelectMediaChange = (evt: Event) => {
    if (evt.target instanceof HTMLSelectElement) {
      goto(getInternalUrl('media', { key: evt.target.value }));
    }
  };
</script>

<aside>
  <slot />

  <div class="right">
    <div class="range">
      <input
        type="range"
        min="1"
        max="100"
        bind:value={$localState.scaleMultiplier}
        aria-hidden="true"
      />
      <Icon icon="grid" width="24px" height="24px" />
    </div>

    {#if ($page.data.media?.type === 'season' || $page.data.media?.type === 'episode') && $page.data.lazy?.parentChildren}
      {@const media = $page.data.media}

      <div class="siblings">
        <Divider />

        {#await $page.data.lazy.parentChildren}
          <div class="loading">
            <Loading />
          </div>
        {:then children}
          {@const currIndex = children.findIndex((c) => c.ratingKey === media.ratingKey)}
          {@const siblings = [children[currIndex - 1], children[currIndex + 1]]}

          {#each siblings as sibling, idx}
            {#if !!sibling}
              <a
                class="icon"
                href={getInternalUrl('media', { key: sibling.ratingKey })}
                title={sibling.title}
              >
                <Icon icon={idx === 0 ? 'chevron-left' : 'chevron-right'} />
              </a>
            {:else}
              <Icon class="icon disabled" icon={idx === 0 ? 'chevron-left' : 'chevron-right'} />
            {/if}

            {#if idx === 0}
              <Select value={$page.data.media.ratingKey} required on:change={onSelectMediaChange}>
                {#each children as child}
                  <option value={child.ratingKey} selected={media.ratingKey === child.ratingKey}>
                    {child.title}
                  </option>
                {/each}
              </Select>
            {/if}
          {/each}
        {/await}
      </div>
    {/if}
  </div>
</aside>

<style lang="postcss">
  aside {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 50px;

    & > :global(a:first-child) {
      @mixin text-semi;

      display: block;
      color: hsla(0, 0%, 100%, 0.75);
      font-size: 1rem;
      line-height: 1.5rem;
      transition: color 0.2s;
      padding-block: 14px;

      @media --hover {
        &:hover {
          color: white;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    height: 100%;
  }

  .range {
    display: none;
    gap: 16px;
    justify-self: flex-end;

    height: 100%;

    color: hsla(0, 0%, 100%, 0.7);
    padding: 12px;

    @media --md {
      display: flex;
    }
  }

  input[type='range'] {
    width: 60px;
    height: 24px;
  }

  .siblings {
    display: flex;
    align-items: center;

    height: 100%;
    color: #ffffffcc;

    & .loading {
      padding-inline: 24px;
    }

    & > :global(.icon) {
      padding: 12px;
    }

    & :global(.disabled) {
      opacity: 0.5;
    }

    & a {
      transition: color 0.2s;

      @media --hover {
        &:hover {
          color: white;
        }
      }
    }

    & :global(select) {
      @mixin text-nowrap;

      max-width: 120px;
    }
  }
</style>
