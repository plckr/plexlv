<script lang="ts" module>
  type SidebarItem = {
    title: string;
    Icon: IconType;
    href: string;
    active: boolean | undefined;
  };

  const getLibraryIcon = (type: string): IconType => {
    switch (type) {
      case 'movie':
        return Icons.Movie;
      case 'show':
        return Icons.Tvshow;
      case 'artist':
        return Icons.Music;
      case 'photo':
        return Icons.Photo;
      default:
        return Icons.Movie;
    }
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import LL from '$i18n/i18n-svelte';
  import { SIDEBAR_CHECKBOX_ID } from '$lib/constants';
  import { getInternalUrl } from '$lib/data';
  import { libraries } from '$lib/stores';
  import { Icons, type IconType } from './icons';

  let currentKey = $derived($page.data.library?.key);

  let items = $derived<SidebarItem[]>([
    {
      title: $LL.home(),
      Icon: Icons.Home,
      href: '/',
      active: $page.url.pathname === '/'
    },
    ...$libraries.map((library) => ({
      title: library.title,
      Icon: getLibraryIcon(library.type),
      active: currentKey === library.key,
      href: getInternalUrl('library', { key: library.key })
    }))
  ]);
</script>

<nav>
  <input type="checkbox" id={SIDEBAR_CHECKBOX_ID} tabindex="-1" aria-hidden="true" />

  <div class="sidebar-wrapper">
    <ul>
      {#each items as { title, Icon, href, active }}
        <li data-active={active ? '' : undefined}>
          <a {href} {title}>
            <div class="icon">
              <Icon />
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

    @media --hover and --md {
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
    transition:
      width 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.2s ease-in;

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
      @mixin text-nowrap;
    }
  }
</style>
