<script lang="ts">
  const asc = ('#ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const).split('');
  const desc = asc.slice().reverse();

  export let order: 'asc' | 'desc' = 'asc';

  let options = order === 'asc' ? asc : desc;
</script>

<div class="jump-bar">
  {#each options as option}
    <button type="button" on:click>
      {option}
    </button>
  {/each}
</div>

<style lang="postcss">
  .jump-bar {
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    font-size: 13px;
    justify-content: space-around;
    margin: 10px 0;
    overflow: hidden;
    padding: 0 10px;
  }

  button {
    color: hsla(0, 0%, 100%, 0.45);
    height: 25px;
    text-align: center;
    transition: color 0.2s;
    cursor: pointer;

    @media --hover {
      &:hover {
        color: #fff;
      }
    }
  }
</style>
