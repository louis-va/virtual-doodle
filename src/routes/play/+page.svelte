<script lang=ts>
	import { onMount } from 'svelte';
	import { HandRenderer } from './HandRenderer';

	let handContainer: HTMLElement;
	let renderer: HandRenderer;

	onMount(async () => {
		renderer = new HandRenderer(handContainer);
		await renderer.init();
		renderer.start();
	})
</script>

<svelte:head>
	<title>Psychic Doodle</title>
	<meta name="description" content="Psychic Doodle Game" />
</svelte:head>

<div class="container">
	<div bind:this={handContainer} id="hand-container"></div>
	<div id="canvas"></div>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}
	#hand-container {
		position: absolute;
		z-index: 10;
	}
	#canvas {
		height: 90vmin;
		width: 90vmin;
		border: 2px solid rgba(var(--item-bg), 0.4);
		outline: 1px solid rgba(var(--item-bg), 0.1);
		outline-offset: 1rem;
		border-radius: var(--item-rounded);
		background-size: 1rem 1rem;
  	background-image: radial-gradient(circle, rgba(var(--item-bg), 0.2) 1px, rgba(0, 0, 0, 0) 1px);
		background-position: center;
	}
</style>
