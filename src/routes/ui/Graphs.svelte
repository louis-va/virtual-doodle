<script lang=ts>
  import { information } from '../state.svelte';
</script>

<div class="container">
  <div class="graph">
    {#each information.cursorHistory as point}
      <svg width="1" height="50" viewBox="0 0 1 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" y1="2.18561e-08" x2="0.499998" y2="50" />
        {#if (point.x)}
          <rect y={point.x / 2} width="1" height="2" />
        {/if}
      </svg>        
    {/each}
  </div>
  <div class="graph">
    {#each information.cursorHistory as point}
      <svg width="1" height="50" viewBox="0 0 1 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" y1="2.18561e-08" x2="0.499998" y2="50" />
        {#if (point.y)}
          <rect y={point.y / 2} width="1" height="2" />
        {/if}
      </svg>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .graph {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 48%;
    aspect-ratio: 1;
  }
  svg {
    height: 100%;
  }
  svg line {
    stroke: rgba(var(--ui-bg), 0.25);
  }
  svg rect {
    fill: rgba(var(--ui-bg), 1);
  }
</style>