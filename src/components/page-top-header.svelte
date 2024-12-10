<script lang="ts">
  import type { Snippet } from 'svelte';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import LL from '$i18n/i18n-svelte';
  import { getInternalUrl } from '$lib/data';
  import { localState } from '$lib/stores';
  import Divider from './ui/divider.svelte';
  import Icon from './ui/icon.svelte';
  import Loading from './ui/loading.svelte';
  import Select from './ui/select.svelte';

  type Props = {
    children?: Snippet;
  };

  let { children }: Props = $props();

  const onSelectMediaChange = (evt: Event) => {
    if (evt.target instanceof HTMLSelectElement) {
      goto(getInternalUrl('media', { key: evt.target.value }));
    }
  };
</script>

<aside>
  {#if $page.data.library}
    {@const library = $page.data.library}
    <a href={getInternalUrl('library', { key: library.key })}>
      {library.title}
    </a>
  {:else if $page.data.media}
    {@const media = $page.data.media}
    <a href={getInternalUrl('library', { key: media.librarySectionID })}>
      {media.librarySectionTitle}
    </a>
  {:else}
    <a href="/">
      {$LL.home()}
    </a>
  {/if}

  {@render children?.()}

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
        <Divider class="divider" />

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
              <Select
                value={$page.data.media.ratingKey}
                required
                onchange={onSelectMediaChange}
                size="lg"
              >
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
    justify-content: space-between;
    flex-direction: column;

    @media --md {
      align-items: center;
      flex-direction: row;

      height: 50px;
    }

    & > a:first-child {
      @mixin text-semi;

      display: block;

      padding-block: 14px;
      width: fit-content;

      font-size: 1rem;
      line-height: 1.5rem;

      color: hsla(0, 0%, 100%, 0.75);
      transition: color 0.2s;

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

    padding: 12px;
    height: 100%;

    color: hsla(0, 0%, 100%, 0.7);

    @media --md {
      display: flex;
    }
  }

  input[type='range'] {
    width: 60px;
    height: 24px;
  }

  .siblings {
    display: none;
    align-items: center;

    height: 100%;
    color: #ffffffcc;

    @media --md {
      display: flex;
    }

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
