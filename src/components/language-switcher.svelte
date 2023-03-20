<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { locales } from '$i18n/i18n-util';
  import Select from './ui/select.svelte';

  const onchange = (evt: Event) => {
    if (evt.target instanceof HTMLSelectElement) {
      $page.url.searchParams.set('lang', evt.target.value);
      goto(`?${$page.url.searchParams.toString()}`, {
        invalidateAll: true
      });
    }
  };
</script>

<Select value={$page.data.lang} on:change={onchange}>
  {#each locales as locale}
    <option value={locale}>{locale.toUpperCase()}</option>
  {/each}
</Select>
