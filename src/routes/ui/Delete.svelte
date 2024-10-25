<script lang=ts>
	import { deleteStrokes } from '../state.svelte';
</script>

<button onclick={() => deleteStrokes()}>
  <div class="content">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M280-184v-512h-48v-32h152v-38.77h192V-728h152v32h-48v512H280Zm32-32h336v-480H312v480Zm104.31-72h32v-336h-32v336Zm95.38 0h32v-336h-32v336ZM312-696v480-480Z"/></svg>
    <span class="text">Delete</span>
  </div>
  <div class="angle top-left"></div>
  <div class="angle top-right"></div>
  <div class="angle bottom-left"></div>
  <div class="angle bottom-right"></div>
</button>

<style>
  button {
    position: relative;
    padding: .375rem;
    height: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    aspect-ratio: 1;
    background-color: rgba(var(--ui-bg), 0.15);
    color: rgba(var(--ui-bg), 1);
  }
  button svg {
    height: 1.5rem;
    width: auto;
  } 
  button .text {
    font-size: .6rem;
    text-transform: uppercase;
  }

  .angle {
		position: absolute;
		width: .5rem;
		height: .5rem;
		--border-color: rgba(var(--ui-bg), 0.75);
    transition: all 50ms var(--easeOutCubic);
	}
	.angle.top-left {
		top: 0;
		left: 0;
		border-top: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}
	.angle.top-right {
		top: 0;
		right: 0;
		border-top: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}
	.angle.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom: 1px solid var(--border-color);
		border-left: 1px solid var(--border-color);
	}
	.angle.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
	}

  button:hover .content {
    background-color: rgba(var(--error), 1);
    color: rgba(var(--ui-bg), 1);
  }

  button:hover .angle.top-left {
		top: .125rem;
		left: .125rem;
	}
  button:hover .angle.top-right {
		top: .125rem;
		right: .125rem;
	}
	button:hover .angle.bottom-left {
		bottom: .125rem;
		left: .125rem;
	}
	button:hover .angle.bottom-right {
		bottom: .125rem;
		right: .125rem;
	}
</style>