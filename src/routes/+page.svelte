<script lang=ts>
	import { onMount } from 'svelte';
	import { HandRenderer } from './core/HandRenderer.svelte';
	import Drawing from './ui/Drawing.svelte';
	import Interface from './ui/Interface.svelte';

	let handContainer: HTMLElement | undefined = $state();
	let renderer: HandRenderer;

	onMount(async () => {
		if (!handContainer) return;
		renderer = new HandRenderer(handContainer);
		await renderer.init();
		renderer.start();
	})
</script>

<svelte:head>
	<title>Virtual Doodle</title>
	<meta name="description" content="Virtual Doodle Game" />
</svelte:head>

<div class="container">
	<div bind:this={handContainer} class="hand"></div>
	<div class="canvas">
		<Drawing />
	</div>
	<Interface />
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
	.hand {
		position: absolute;
		z-index: 20;
		pointer-events: none;
	}
	.canvas {
		height: 100%;
		width: 100%;
		background-size: 1rem 1rem;
  	background-image: radial-gradient(circle, rgba(var(--ui-bg), 0.1) 1px, rgba(0, 0, 0, 0) 1px);
		background-position: center;
	}
</style>
