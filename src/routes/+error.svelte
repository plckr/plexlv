<script lang="ts" context="module">
  const errorMessage: {
    [key in number | 'default']: {
      title: string;
      description: string;
      showAnchor?: boolean;
    };
  } = {
    404: {
      title: 'Não encontrado',
      description: 'Não conseguimos encontrar a página que queres ver',
      showAnchor: true
    },
    default: {
      title: 'Algo correu mal',
      description: 'Ocorreu um erro inesperado'
    }
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '$components/ui/icon.svelte';

  $: code = $page.status;
  $: error = errorMessage[code] || errorMessage.default;
</script>

<div class="root">
  <div class="icon">
    <Icon icon="alert" />
  </div>

  <p class="error">{error.title}</p>
  <p class="description">{error.description}</p>

  {#if error.showAnchor}
    <a href="/">Ir para a página principal</a>
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
