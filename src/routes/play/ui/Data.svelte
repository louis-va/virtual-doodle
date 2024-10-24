<script lang=ts>
  import { information } from '../state.svelte';

  const number_of_decimals = 4;

  const cx = $derived(information.cursor.x?.toFixed(number_of_decimals));
  const cy = $derived(information.cursor.y?.toFixed(number_of_decimals));
  const hd = $derived(information.handedness);
  const sc = $derived(information.score?.toFixed(number_of_decimals));
</script>

<div class="data">
  <div class="data-point">cx: {cx ? cx : 'null'}</div>
  <div class="data-point">cy: {cy ? cy : 'null'}</div>
  <div class="data-point">hd: {hd ? hd : 'null'}</div>
  <div class="data-point">sc: {sc ? sc : 'null'}</div>
</div>

<style>
  .data {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: .25rem;
    width: 5rem;
  }
  .data-point {
    font-size: 0.5rem;
    text-transform: uppercase;
    color: rgba(var(--ui-bg), 1);
  }
</style>