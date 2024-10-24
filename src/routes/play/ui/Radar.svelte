<script lang=ts>
  import { information } from '../state.svelte';
</script>

<div class="container">
  <div class="radar">
    <div class="dot" style={`top: ${information.cursor.y}%; left: ${information.cursor.x}%; display: ${information.score > 0 ? 'block': 'none'}`}></div>
    <div class="angle top-left"></div>
    <div class="angle top-right"></div>
    <div class="angle bottom-left"></div>
    <div class="angle bottom-right"></div>
  </div>
  <div class={`badge ${information.score > 0.85 ? 'success' : information.score > 0 ? 'warning' : 'error'}`}>
    {#if (information.score > 0.85)}
      Detected
    {:else if (information.score > 0)}
      Lagging
    {:else}
      Not found
    {/if}
  </div>
</div>

<style>
  .container {
    height: 100%;
		aspect-ratio: 1;
  }

	.radar {
		position: relative;
    width: 100%;
		height: 75%;
		background-size: .25rem .25rem;
  	background-image: radial-gradient(circle, rgba(var(--ui-bg), 0.25) 1px, rgba(0, 0, 0, 0) 1px);
		background-position: center;
    overflow: hidden;
	}
  .radar .dot {
    position: absolute;
    width: .2rem;
    height: .2rem;
    border-radius: .2rem;
    background-color: rgb(var(--success));
  }
  .radar .angle {
		position: absolute;
		width: .5rem;
		height: .5rem;
		--border-color: rgba(var(--ui-bg), 0.75);
	}
	.radar .angle.top-left {
		top: 0;
		left: 0;
		border-top: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}
	.radar .angle.top-right {
		top: 0;
		right: 0;
		border-top: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}
	.radar .angle.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}
	.radar .angle.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(25% - .25rem);
    margin-top: .25rem;
    font-size: .5rem;
    text-transform: uppercase;
  }
  .badge.success {
    background-color: rgb(var(--success));
  }
  .badge.warning {
    background-color: rgb(var(--warning));
  }
  .badge.error {
    background-color: rgb(var(--error));
  }
</style>
