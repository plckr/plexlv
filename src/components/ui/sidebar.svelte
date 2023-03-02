<script lang="ts" context="module">
  export type SidebarItem = {
    title: string;
    icon: IconOptions;
    href: string;
    active: boolean | undefined;
  };

  const getLibraryIcon = (type: string): IconOptions => {
    switch (type) {
      case 'movie':
        return 'movie';
      case 'show':
        return 'tvshow';
      case 'artist':
        return 'music';
      case 'photo':
        return 'photo';
      default:
        return 'movie';
    }
  };
</script>

<script lang="ts">
  import Icon from './icon.svelte';
  import type { IconOptions } from './icon.svelte';
  import { sidebarCheckboxId } from '$lib/constants';
  import { libraries } from '$lib/stores';
  import type { PlexLibrary } from '$lib/plex.server';
  import { slugify } from '$lib/utils/string';
  import { page } from '$app/stores';

  $: currentKey = $page.params.key;

  $: items = <SidebarItem[]>[
    {
      title: 'Início',
      icon: 'home',
      href: '/',
      active: $page.url.pathname === '/'
    },
    ...$libraries.map((library: PlexLibrary) => ({
      title: library.title,
      icon: getLibraryIcon(library.type),
      active: currentKey === library.key.toString(),
      href: `/${library.key}/${slugify(library.title)}`
    }))
  ];
</script>

<nav>
  <input type="checkbox" id={sidebarCheckboxId} />

  <div class="sidebar-wrapper">
    <ul>
      {#each items as { title, icon, href, active }}
        <li data-active={active ? '' : undefined}>
          <a {href} {title}>
            <div class="icon">
              <Icon {icon} />
            </div>
            <span>
              {title}
            </span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style lang="postcss">
  nav {
    --sidebar-width: 52px;
    --sidebar-width-open: 260px;

    position: relative;
    width: 100%;
    height: 100%;
  }

  input {
    @mixin visually-hidden;

    &:checked + .sidebar-wrapper {
      position: relative;
      width: var(--sidebar-width-open);
    }

    @media --hover {
      &:not(:checked) + .sidebar-wrapper:hover {
        width: var(--sidebar-width-open);
        background-color: #1f2326;
      }
    }
  }

  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    width: var(--sidebar-width);
    height: 100%;

    display: flex;
    flex-direction: column;

    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease-in;

    overflow: hidden;
    z-index: 100;
  }

  ul {
    width: var(--sidebar-width-open);
  }

  li {
    position: relative;

    &[data-active] {
      &::before {
        content: '';

        position: absolute;
        top: 2px;
        bottom: 2px;
        left: 0;

        width: 2px;

        background-color: #e5a00d;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      & a {
        color: #e5a00d;
      }
    }

    @media --hover {
      &:hover[data-active]::before {
        background-color: white;
      }

      &:hover a {
        color: white;
      }
    }
  }

  a {
    @mixin text-semi;

    display: flex;
    align-items: center;
    gap: 20px;

    padding-inline: 14px;

    min-height: 50px;

    font-size: 15px;
    line-height: 1.5;

    color: hsla(0, 0%, 100%, 0.7);
    transition: color 0.2s;

    & .icon {
      flex: 0 0 auto;
      width: 24px;
      height: 24px;
    }

    & span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
