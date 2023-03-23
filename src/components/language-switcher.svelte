<script lang="ts">
  import { page } from '$app/stores';
  import { locales } from '$i18n/i18n-util';
  import Icon from './ui/icon.svelte';
  import Select from './ui/select.svelte';

  const onchange = (evt: Event) => {
    if (evt.target instanceof HTMLSelectElement) {
      $page.url.searchParams.set('lang', evt.target.value);
      // Hard reload to apply html lang property
      window.location.href = `${$page.url.pathname}?${$page.url.searchParams.toString()}`;
    }
  };
</script>

<div class="language-switcher">
  <Icon icon="language" width="22px" height="22px" />
  <Select value={$page.data.lang} on:change={onchange}>
    {#each locales as locale}
      <option value={locale}>{locale.toUpperCase()}</option>
    {/each}
  </Select>
</div>

<style lang="postcss">
  .language-switcher {
    display: flex;
    align-items: center;

    padding-left: 4px;
    max-width: fit-content;

    color: white;
    border: 1px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 4px;
  }
</style>
