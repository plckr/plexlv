<script lang="ts">
  import LanguageSwitcher from '$components/language-switcher.svelte';
  import LL from '$i18n/i18n-svelte';
  import { SIDEBAR_CHECKBOX_ID } from '$lib/constants';
  import { Icons } from './icons';
</script>

<aside>
  <label class="hamburger-menu" aria-label={$LL.mainMenu()} for={SIDEBAR_CHECKBOX_ID}>
    <Icons.Hamburger height={24} width={24} />
  </label>

  <div style="display: flex; gap: 8px;">
    <Icons.Plex height={24} />
  </div>

  <div class="lang">
    <LanguageSwitcher />
  </div>
</aside>

<style lang="postcss">
  aside {
    position: relative;

    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr auto 1fr;
    gap: 16px;
    flex-grow: 1;

    height: 48px;

    font-size: 13px;
    background: #00000099;
    border-radius: 4px;
    z-index: 200;

    & :global(svg) {
      height: 24px;
    }

    & .lang {
      justify-self: flex-end;
      padding-right: 12px;
    }
  }

  .hamburger-menu {
    padding: 12px;

    width: 48px;

    color: hsla(0, 0%, 100%, 0.7);
    transition: color 0.2s;
    cursor: pointer;

    @media --hover {
      &:hover {
        color: white;
      }
    }
  }
</style>
