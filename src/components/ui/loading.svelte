<script lang="ts">
</script>

<div class="loading" />

<style lang="postcss">
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(1turn);
    }
  }

  .loading {
    display: inline-block;

    height: 24px;
    width: 24px;

    border-style: solid;
    border-color: #cc7b19 transparent transparent #cc7b19;
    border-width: 2px;

    border-radius: 50%;

    animation: loading 0.6s linear infinite;
  }
</style>
