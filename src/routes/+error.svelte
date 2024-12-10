<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '$components/ui/icon.svelte';
  import LL from '$i18n/i18n-svelte';

  const errorMessage: {
    [key in number | 'default']: {
      title: string;
      description: string;
      showAnchor?: boolean;
    };
  } = {
    404: {
      title: $LL.errorNotFoundTitle(),
      description: $LL.errorNotFoundMessage(),
      showAnchor: true
    },
    default: {
      title: $LL.errorDefaultTitle(),
      description: $LL.errorDefaultMessage()
    }
  };

  let code = $derived($page.status);
  let error = $derived(errorMessage[code] || errorMessage.default);
</script>

<div class="root">
  <div class="icon">
    <Icon icon="alert" width="40px" height="40px" />
  </div>

  <p class="error">{error.title}</p>
  <p class="description">{error.description}</p>

  {#if error.showAnchor}
    <a href="/">{$LL.goHome()}</a>
  {/if}
</div>

<style lang="postcss">
  .root {
    padding: 48px;
    width: 100%;
    height: 100%;

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    font-size: 15px;
    line-height: 1.5;
  }

  .icon {
    margin-bottom: 42px;
    padding: 30px;

    width: 100px;
    height: 100px;

    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }

  .error {
    @mixin text-semi;

    font-size: 24px;
    max-width: 640px;
    text-align: center;
  }

  .description {
    margin-block: 30px 42px;
    color: hsla(0, 0%, 100%, 0.75);
  }

  a {
    color: #cc7b19;
    transition: color 0.2s;

    @media --hover {
      &:hover {
        color: white;
      }
    }
  }
</style>
