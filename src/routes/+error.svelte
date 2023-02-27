<script>
  import Icon from '$components/ui/icon.svelte';
</script>

<div class="root">
  <div class="icon">
    <Icon icon="alert" />
  </div>

  <p class="error">Não encontrado</p>
  <p class="description">Não conseguimos encontrar a página que queres ver</p>

  <a href="/">Ir para a página principal</a>
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
